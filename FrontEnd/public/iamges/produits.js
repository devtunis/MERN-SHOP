function verif(){
    pass=document.getElementById("registerPassword").value;
    cpass=document.getElementById("confirmPassword").value;
    if(pass != cpass){
        alert("les mots de pass ne corespond pas");return false;
    }
    
}