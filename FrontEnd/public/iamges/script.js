 // S'assurer que le DOM est complètement chargé avant d'exécuter le script
 document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('registrationForm').addEventListener('submit', function(event) {
        // Récupérer les valeurs des champs de mot de passe
        var password = document.getElementById('registerPassword').value;
        var confirmPassword = document.getElementById('confirmPassword').value;

        // Vérifier si les mots de passe correspondent
        if (password !== confirmPassword) {
            alert("Les mots de passe ne correspondent pas.");
            event.preventDefault(); // Empêche l'envoi du formulaire
        }
    });
});