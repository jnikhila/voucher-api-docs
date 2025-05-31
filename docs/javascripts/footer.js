document.addEventListener("DOMContentLoaded", function() {
    let footer = document.querySelector('footer');
    let copyrightText = document.createElement('p');
    copyrightText.innerHTML = "Copyright &copy; " + new Date().getFullYear() + " Nikhila Jain. All rights reserved.";
    footer.appendChild(copyrightText);
});