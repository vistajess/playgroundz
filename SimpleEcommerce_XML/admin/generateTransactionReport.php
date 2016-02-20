<?php

  
  session_start();
require_once('../fpdf/fpdf.php');
include('../config/config.php');


  class PDF extends FPDF {

    function Header() {
      $this->Image('images/header.jpg',5,5,200,35);
      $this->SetFont('Arial','B','15');
      $this->Cell(80);
      $this->Cell(30,10,'',0,1,'C');

      $timestamp = time();
      $this->SetFont('Arial','I',11);
      $this->SetTextColor(255);
      $this->Cell(0,33,strftime("%m - %d - %Y", $timestamp), 0, 0,'L');
      //$this->Ln(3);
      $this->Ln();
    }

    function Footer() {
      $this->SetY(-15);
      $this->SetFont('Arial','I',8);
      $this->SetTextColor(255);
      // $this->Image('images/pdfFooter.png',5,278,200,15);
      $this->Cell(0,0,'Page '.$this->PageNo(),0,0,'R');
    }


    function LoadData() {
    include('../config/config.php');
      // $conn = mysqli_connect(DB_HOST, DB_USER, DB_PASS, DB_NAME);
      $result = mysqli_query($conn, "SELECT user_id, transaction_date, payment_method, transaction_id, total_amount FROM tbl_transaction");
      while($row=mysqli_fetch_row($result)) {
        $data[] = $row;
      }
      return $data;
    }

    function ShowTable($header,$data) {
      foreach($header as $col)
      $this->Cell(0,7,$col,1);
      $this->Ln();
      
      foreach($data as $row) {
        foreach($row as $col)
          $this->Cell(30,6,$col,1);
        $this->Ln();
      } 
    }

    function FancyTable($header,$data) { 
          // Colors, line width and bold font
        $this->SetFont('Arial','B', 20);
        $this->Cell(0,10,'TRANSACTIONS LIST','0',0,'C',0);
        $this->Ln();
          $this->SetFillColor(100,100,100);
          $this->SetTextColor(255);
          $this->SetDrawColor(128,0,0);
          $this->SetLineWidth(.3);
          $this->SetFont('','B', 10);
          // Header
          $w = array(20,35,45, 70, 25);
          for($i=0;$i<count($header);$i++)
             $this->Cell($w[$i],7,$header[$i],1,0,'C',true);
          $this->Ln();
          // Color and font restoration
          $this->SetFillColor(224,235,255);
          $this->SetTextColor(0);
          $this->SetFont('');
          // Data
          $fill = false;
          foreach($data as $row) {
              $this->Cell($w[0],6,$row[0],'LR',0,'L',$fill);
              $this->Cell($w[1],6,$row[1],'LR',0,'L',$fill);
              $this->Cell($w[2],6,$row[2],'LR',0,'L',$fill);
              $this->Cell($w[3],6,$row[3],'LR',0,'R',$fill);
              $this->Cell($w[4],6,$row[4],'LR',0,'C',$fill);
              $this->Ln();
              $fill = !$fill;
          }
          
         include('../config/config.php');
        $result = mysqli_query($conn, "SELECT user_id, transaction_date, payment_method, transaction_id, total_amount FROM tbl_transaction");
      
          // Closing line
        $this->SetFont('Arial','I', 10);
        $this->Cell(0,5,'*** END OF FILE ***','0',0,'C',0);
        $this->Ln();
        $this->Cell(0,5,"Total: " . mysqli_num_rows($result), 0, 1,'R',0);
         // $this->Cell(array_sum($w),0,'','T');
          
      }

  }


  $pdf = new PDF();
  $header=array('UserId','Date','Payment Method' ,'Transaction Number','Amount');
  $data=$pdf->LoadData();
  $pdf->SetFont('Arial','','12');
  $pdf->AddPage();
  $pdf->FancyTable($header,$data);


  $pdf->Output();
?>