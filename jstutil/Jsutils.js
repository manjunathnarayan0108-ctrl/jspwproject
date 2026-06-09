


 function getCurrentDateTime() {
     const now = new Date();
     const year = now.getFullYear();
     const month = String(now.getMonth() + 1).padStart(2, '0');
     const day = String(now.getDate()).padStart(2, '0');
     const hours = String(now.getHours()).padStart(2, '0');
     const minutes = String(now.getMinutes()).padStart(2, '0');
     const seconds = String(now.getSeconds()).padStart(2, '0');
     return `${year}${month}${day}_${hours}${minutes}${seconds}`;
 }


  function generateUniqueUsername(base) {
     const timestamp = getCurrentDateTime();
     return `${base}_${timestamp}`;
 }  


  export function generateRandomNumber() {

    return Math.floor(1000+Math.random() *9000); // Generates a random number between 0 and 9999

  }



    function generateRandomText(length) {

        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result= ' ';
             
        const charactersLength = characters.length;
        for ( let i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
 
    }

    
 