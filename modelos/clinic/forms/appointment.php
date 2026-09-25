<?php
  /**
  * Requires the "PHP Email Form" library
  * The "PHP Email Form" library is available only in the pro version of the template
  * The library should be uploaded to: vendor/php-email-form/php-email-form.php
  * For more info and help: https://bootstrapmade.com/php-email-form/
  */

  // Replace contact@example.com with your real receiving email address
  $receiving_email_address = 'contact@example.com';

  if( file_exists($php_email_form = '../assets/vendor/php-email-form/php-email-form.php' )) {
    include( $php_email_form );
  } else {
    die( 'Não foi possível carregar a biblioteca de envio de e-mails do formulário.');
  }

  $contact = new PHP_Email_Form;
  $contact->ajax = true;
  
  $contact->to = $receiving_email_address;
  $contact->from_name = $_POST['name'];
  $contact->from_email = $_POST['email'];
  $contact->subject = 'Agendamento de consulta on-line';

  // Uncomment below code if you want to use SMTP to send emails. You need to enter your correct SMTP credentials
  /*
  $contact->smtp = array(
    'host' => 'example.com',
    'username' => 'example',
    'password' => 'pass',
    'port' => '587'
  );
  */

  $contact->add_message( $_POST['name'], 'Nome');
  $contact->add_message( $_POST['email'], 'E-mail');
  $contact->add_message( $_POST['phone'], 'Telefone');
  isset($_POST['date']) && $contact->add_message($_POST['date'], 'Data da consulta');
  isset($_POST['time']) && $contact->add_message($_POST['time'], 'Horário da consulta');
  isset($_POST['department']) && $contact->add_message($_POST['department'], 'Especialidade');
  isset($_POST['doctor']) && $contact->add_message($_POST['doctor'], 'Médico');
  $contact->add_message( $_POST['message'], 'Mensagem');

  echo $contact->send();
?>
