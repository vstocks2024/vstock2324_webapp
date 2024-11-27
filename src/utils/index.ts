export function formatTimeToMinSec(time: number) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${appendZero(seconds,2)}`;
  }
  
  export function formatTimeToMinSecMili(time: number) {
    const mili = Math.floor((time % 1000) / 10 );
    return formatTimeToMinSec(time / 1000) + `.${appendZero(mili, 2)}`;
  }
  
  function appendZero(value: number, minDigits: number = 2) {
    return value.toString().padStart(minDigits, "0");
  }