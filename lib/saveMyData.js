// Format data as csv
function saveMyData(trial_data){
    var blob = new Blob([ConvertToCSV(trial_data)]);

    // Create file ref and put
    var file_ref = firebase.storage().ref(("data/").concat(fname).concat(".csv"));
    file_ref.put(blob).then(function(snapshot) {
      console.log('Results saved!');
    });
}