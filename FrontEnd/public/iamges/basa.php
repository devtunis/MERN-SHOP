<?php
mysql_select_db('kemil');
mysql_connect('localhost','root','');
$p=$_POST['registerFirstname'];
$n=$_POST['registerName'];
$m=$_POST['registerEmail'];
$tel=$_POST['registerPhone'];
$pass=$_POST['registerPassword'];
$req=mysql_query("select * from clinet where '$m'=mailCL);
$n1=mysql_num_rows("req");
if $n1!=0{
    echo("vous avez crée déja un compte")
}
else{
    $req=mysql_query("insert into client values('$n','$p','$m','$tel','$pass')";
    echo("compte crée avec succcé");

}





?>