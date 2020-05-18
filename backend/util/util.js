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