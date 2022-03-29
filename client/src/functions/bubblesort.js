export default function bubbleSort(array,direction) {
    // Implementar el método conocido como bubbleSort para ordenar de menor a mayor
    // el array recibido como parámetro
    // Devolver el array ordenado resultante
    // Tu código:
    var perm = 0;
    var placeholder;
    if (direction === "W_ASCENDENTE"){
        for (let i=0 ; i<array.length-1 ; i++){
            if (array[i].avgW>array[i+1].avgW){
                placeholder = array[i];
                array[i]=array[i+1];
                array[i+1]=placeholder;
                perm++;
                console.log('change')
            }
            if (perm===0){
                console.log(array)
                return array;
            }
        }
    } else if (direction === 'W_DESCENDENTE'){
        for (let i=0 ; i<array.length-1 ; i++){
            if (array[i].avgW<array[i+1].avgW){
                placeholder = array[i];
                array[i]=array[i+1];
                array[i+1]=placeholder;
                perm++;
                console.log('change')
            }
            if (perm===0){
                console.log(array)
                return array;
            }
        }       
    }
}
