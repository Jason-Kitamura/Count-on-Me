function getDuplicateArrayElements(arr){
    var sorted_arr = arr.slice().sort();
    var results = [];
    for (var i = 0; i < sorted_arr.length - 1; i++) {
        if (sorted_arr[i + 1] === sorted_arr[i]) {
            results.push(sorted_arr[i]);
        }
    }
    return results;
}
function tree (arr) {
    if (!arr) return "";
     if (arr.length === 0) return "";    
     const sum = (arr, idx) => {
         if (idx - 1 < arr.length) {
             if (arr[idx - 1] === -1) return 0;
             return arr[idx - 1] + sum(arr, idx * 2) + sum(arr, idx * 2 + 1);
         }
         return 0;
     };
     const left = sum(arr, 2);
     const right = sum(arr, 3);
     return (left == right) ? "" : (left > right ? "Left" : "Right"); 
}

function findLevel(index){
    return Math.floor(Math.log2(index + 1)); // index + 1 --> because zero based index in arrays
    //else return Math.round(Math.sqrt(index)) +1 ;
}

function findParentIndex(index, zeroLevel=true){
    let parentIndex = index / 2;
    if (zeroLevel) parentIndex = parentIndex - 1;
    return parentIndex;
}

function isInLeftBranch(index, rootIndex=0){
    let firstIndxInLevel = Math.pow(2, findLevel(index)) - 1 ; // -1 --> because out root level is zero 
    let lastIndxInLevel = firstIndxInLevel * 2; // because the root level is 0 otherwise --> (firstIndxInLevel * 2) - 1
    return ( (index - firstIndxInLevel) < (firstIndxInLevel / 2) ) ? true : false;
}

function isLeftChild(index, zeroLevel=true){
    let isLeft = false;
    if (index % 2 != 0) { 
        isLeft = true; // if it is odd number
    }
    if (!zeroLevel) isLeft = !isLeft;
    return isLeft;
}