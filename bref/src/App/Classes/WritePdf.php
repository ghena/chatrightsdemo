<?php

namespace App\Classes;

use setasign\Fpdi\Fpdi;

Class WritePdf {

    private $pdf;
    private $params;
    private $imageData;

    public function __construct($pathbase,$params,$imageData)
    {

        $this->pdf = new Fpdi();
        $this->params=$params;
        $this->imageData=$imageData;

        if(!is_file($pathbase)){
            $output['errors'][] = "Missing template file";
            return  json_encode($output,JSON_PRETTY_PRINT);
        }

        // set the source file
        $this->pdf->setSourceFile($pathbase);

    }

    public function process(){

        $this->setFirstPage();

        //see the results
        return $this->pdf->Output("S");
    }

    private function setFirstPage(){

        // add a page
        $this->pdf->AddPage();

        // import page 1
        $tplId =  $this->pdf->importPage(1);

        // use the imported page and place it at point 10,10 with a width of 100 mm
        $this->pdf->useTemplate($tplId);
        

        // The new content
        $this->setCountry($this->imageData->state);
        $this->setName($this->imageData->name);
        $this->setSurName($this->imageData->lastname);
        $this->setBirthDate($this->imageData->birth_date);
        $this->setStatoCivile($this->params->slotEight);
        $this->setProfessione($this->params->professione);
        $this->setComune($this->params->comune);
        $this->setAddress($this->params->address);
        $this->setScala($this->params->scala);
        $this->setPiano($this->params->piano);
        $this->setInterno($this->params->interno);
        $this->setNumeroCivico($this->params->civico);
        $this->setProvincia("PA");

    }


    private function setCountry($country=null){

        $fontSize = '12';
        $left = 85;
        $top = 60;

        //set the font, colour and text to the page.
        $this->pdf->SetFont("helvetica", "B",  $fontSize);
        //$this->pdf->SetTextColor($fontColor);
        $this->pdf->Text($left,$top,$country);

    }
    
    private function setName($name=null){

        $fontSize = '12';
        $left = 26;
        $top = 126;

        //set the font, colour and text to the page.
        $this->pdf->SetFont("helvetica", "B",  $fontSize);
        //$this->pdf->SetTextColor($fontColor);
        $this->pdf->Text($left,$top,strtoupper($name));

    }

    private function setSurName($surname=null){

        $fontSize = '12';
        $left = 40;
        $top = 118;

        //set the font, colour and text to the page.
        $this->pdf->SetFont("helvetica", "B",  $fontSize);
        //$this->pdf->SetTextColor($fontColor);
        $this->pdf->Text($left,$top,strtoupper($surname));

    }

    private function setBirthDate($date=null){

        $fontSize = '12';
        $left = 158;
        $top = 126;

        //set the font, colour and text to the page.
        $this->pdf->SetFont("helvetica", "B",  $fontSize);
        //$this->pdf->SetTextColor($fontColor);
        $this->pdf->Text($left,$top,strtoupper($date));

    }

    private function setStatoCivile($str=null){

        $fontSize = '12';
        $left = 164;
        $top = 135;

        //set the font, colour and text to the page.
        $this->pdf->SetFont("helvetica", "B",  $fontSize);
        $this->pdf->Text($left,$top,strtoupper($str));

    }

    private function setProfessione($str=null){

        $fontSize = '12';
        $left = 112;
        $top = 149;

        //set the font, colour and text to the page.
        $this->pdf->SetFont("helvetica", "B",  $fontSize);
        $this->pdf->Text($left,$top,strtoupper($str));

    }

    private function setComune($str=null){

        $fontSize = '12';
        $left = 30;
        $top = 265;

        //set the font, colour and text to the page.
        $this->pdf->SetFont("helvetica", "B",  $fontSize);
        $this->pdf->Text($left,$top,strtoupper($str));

    }

    private function setAddress($str=null){

        $fontSize = '12';
        $left = 34;
        $top = 273;

        //set the font, colour and text to the page.
        $this->pdf->SetFont("helvetica", "B",  $fontSize);
        $this->pdf->Text($left,$top,strtoupper($str));

    }

    private function setScala($str=null){

        $fontSize = '12';
        $left = 26;
        $top = 281;

        //set the font, colour and text to the page.
        $this->pdf->SetFont("helvetica", "B",  $fontSize);
        $this->pdf->Text($left,$top,strtoupper($str));

    }

    private function setPiano($str=null){

        $fontSize = '12';
        $left = 90;
        $top = 281;

        //set the font, colour and text to the page.
        $this->pdf->SetFont("helvetica", "B",  $fontSize);
        $this->pdf->Text($left,$top,strtoupper($str));

    }

    
    private function setInterno($str=null){

        $fontSize = '12';
        $left = 165;
        $top = 281;

        //set the font, colour and text to the page.
        $this->pdf->SetFont("helvetica", "B",  $fontSize);
        $this->pdf->Text($left,$top,strtoupper($str));

    }


    private function setNumeroCivico($str=null){

        $fontSize = '12';
        $left = 176;
        $top = 273;

        //set the font, colour and text to the page.
        $this->pdf->SetFont("helvetica", "B",  $fontSize);
        //$this->pdf->SetTextColor($fontColor);
        $this->pdf->Text($left,$top,strtoupper($str));

    }

    private function setProvincia($str=null){

        $fontSize = '12';
        $left = 163;
        $top = 265;

        //set the font, colour and text to the page.
        $this->pdf->SetFont("helvetica", "B",  $fontSize);
        //$this->pdf->SetTextColor($fontColor);
        $this->pdf->Text($left,$top,strtoupper($str));

    }


}