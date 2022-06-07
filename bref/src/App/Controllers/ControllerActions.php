<?php

namespace App\Controllers;

use Aws\Exception\AwsException;
use Aws\Credentials\CredentialProvider;
use Aws\Textract\TextractClient;
use Aws\S3\S3Client;
use Aws\S3\Exception\S3Exception;

use App\Classes\WritePdf;
use Exception;

Class ControllerActions{


    public static function Textract(){

            $output = new \StdClass();
            $output->status = false;
            $output->data = new \StdClass();
            $output->errors = [];
        
            $_name = (isset($_REQUEST['name']))?$_REQUEST['name']:false;

            if(isset($_name) && empty($_name)){
                $output->errors[] = "Missing Parameter Name";
                print json_encode($output,JSON_PRETTY_PRINT);
                die;
            }

            try{

                $credentials= [
                    'key' => $_ENV['AWS_TEXTRACT_ACCESS_ID'],
                    'secret' => $_ENV['AWS_TEXTRACT_SECRET_ID']
                ];

                $S3URi =  $_ENV['S3_BUCKET_FOLDER'].'/'. $_name;

                $client = new TextractClient([
                    'region' => 'eu-west-1',
                    'version' => '2018-06-27',
                    'credentials' =>  $credentials
                ]);
                
                $S3 = new S3Client([
                    'region' => 'eu-west-1',
                    'version' => '2006-03-01',
                    'credentials' => $credentials
                ]);

                $result = $client->analyzeID([
                    'DocumentPages' => [ // REQUIRED
                        [
                            'S3Object' => [       
                                'Bucket' => $_ENV['S3_BUCKET'],
                                'Name' => $S3URi
                            ]
                            
                        ]
                    ],
                ]);

                if($result->hasKey('IdentityDocuments')){

                    $data = $result->get('IdentityDocuments');

                    $item = $data[0]['IdentityDocumentFields'];

                    $output->data->name = $item[0]['ValueDetection']['Text']. " ". $item[2]['ValueDetection']['Text'];
                    $output->data->lastname = $item[1]['ValueDetection']['Text'];
                    $output->data->city = $item[4]['ValueDetection']['Text'];
                    $output->data->address = $item[17]['ValueDetection']['Text'] ;     
                    $output->data->state = $item[7]['ValueDetection']['Text'];
                    $output->data->document_number = $item[8]['ValueDetection']['Text'];
                    $output->data->expiration_date = $item[9]['ValueDetection']['Text'];
                    $output->data->birth_date = $item[10]['ValueDetection']['Text'];
                    $output->data->issue_date = $item[11]['ValueDetection']['Text'];

                    $output->status = true;

                }else{

                    $output->errors[] = "Dati non presenti";

                }

                //// delete document after analysis
                $test = $S3->deleteObject(['Bucket' => $_ENV['S3_BUCKET'], 'Key' => $S3URi]);


            }catch(\Exception $e){


                $output->errors[] = "Si è generato un errore";

            }

            return  json_encode($output,JSON_PRETTY_PRINT);

    }


    public static function getPdf(){

        $output = new \StdClass();
        $output->status = false;
        $output->data = new \StdClass();
        $output->errors = [];

        $json = @file_get_contents('php://input');
        $POST = @json_decode($json);

        if(!isset($POST->slots) || empty($POST->slots) || !$POST->slots){
            $output->errors[] = 'Missing parameters' ;
            return  json_encode($output,JSON_PRETTY_PRINT);
        }

        // initiate FPDI

        $pathbase = dirname(dirname(dirname(__DIR__)))."/cambio-residenza.pdf";

        try{
            $WritePdf = new WritePdf($pathbase,$POST->slots,$POST->imageData);
            $binaryPdf = $WritePdf->process();

            $credentials= [
                'key' => $_ENV['AWS_TEXTRACT_ACCESS_ID'],
                'secret' => $_ENV['AWS_TEXTRACT_SECRET_ID']
            ];

            $S3 = new S3Client([
                'region' => 'eu-west-1',
                'version' => '2006-03-01',
                'credentials' => $credentials
            ]);

            $fileName = "mytest.".MD5(time()).".pdf";
            $keyName = "{$_ENV['S3_BUCKET_FOLDER']}/{$fileName}";
            $result = $S3->upload($_ENV['S3_BUCKET'],$keyName,$binaryPdf, 'public-read')->toArray();

            $output->data->uri = (string) $result['ObjectURL'];
            $output->data->key_name  =  $keyName;

            $output->status = true;


        }catch(\Exception $e){

                $output->errors[] = "Si è generato un errore imprevisto";

        }

        return  json_encode($output,JSON_PRETTY_PRINT);

    }

    public static function Download(){

        $_pdfKey = (isset($_REQUEST['pdf']) && !empty($_REQUEST['pdf']))?$_REQUEST['pdf']:false;

        try{

                if($_pdfKey){
                    
                        $credentials= [
                            'key' => $_ENV['AWS_TEXTRACT_ACCESS_ID'],
                            'secret' => $_ENV['AWS_TEXTRACT_SECRET_ID']
                        ];

                        $S3 = new S3Client([
                            'region' => 'eu-west-1',
                            'version' => '2006-03-01',
                            'credentials' => $credentials
                        ]);

                        $result = $S3->getObject([
                            'Bucket' => $_ENV['S3_BUCKET'],
                            'Key'    => $_pdfKey
                        ]);

                        $data = $result->toArray();

                        $body = $result->get('Body')->__toString();

                        //Set the Content-Type to application/pdf
                        header('Content-Type: application/pdf');
                        //Set the Content-Length header.
                        header('Content-Length: ' . strlen($body));
                        //Set the Content-Transfer-Encoding to "Binary"
                        header('Content-Transfer-Encoding: Binary');

                        //The filename that it should download as.
                        $downloadName = $data['@metadata']['headers']['etag'].".pdf";

                        //Set the Content-Disposition to attachment and specify
                        //the name of the file.
                        header('Content-Disposition: attachment; filename=' . $downloadName);
                     
                        //Read the PDF file data and exit the script.
                        print $body;
                        exit();

                       
                }

                die("Missing parameter");


            }catch(\Exception $e){

              die("Not found");

        }


    }

}