window.onload = function(){

    const btn_prev = document.querySelector('#gallery .buttons .prev');
    const btn_next = document.querySelector('#gallery .buttons .next');

    const images = document.querySelectorAll('#gallery .photos img');
    let i = 0;

    const button_die = () => {
        if(i == 0) {
            btn_prev.setAttribute("disabled", "true");
            btn_prev.onclick = () => {
                return;
            }
        }
    }

    btn_prev.onclick = function(){
        button_die()

         images[i].classList.remove('showed');
         i--;
         
         if(i < 0){
             // i = images.length - 1;
         }
         
         images[i].classList.add('showed');

         
    }

    btn_next.onclick = function(){
        button_die()
         images[i].classList.remove('showed');
         i++;
         
         if(i >= images.length){
            btn_next.disabled
         }
        
         images[i].classList.add('showed');

         
    }

}

/*

const slides = document.querySelectorAll('.slider li')

*/