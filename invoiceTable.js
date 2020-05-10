$(document).ready(function() {
    $.getJSON("invoice_list.json", function(data){ 
        let invoice_list = '';
        $.each(data, function(key, value){
            invoice_list += '<tr>';
            invoice_list += '<td>'+value.type+'</td>';
            invoice_list += '<td>'+value.accountName+'</td>';
            invoice_list += '<td>'+value.status+'</td>';
            invoice_list += '<td>'+value.currency+'</td>';
            invoice_list += '<td>'+value.balance+'</td>';
            invoice_list += '</tr>';
        });
        $('#invoice_table').append(invoice_list);    
    });
});