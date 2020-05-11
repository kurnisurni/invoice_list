_app = null
init = function () {
    // if vue hasn't loaded yet, wait 200 ms, then init again
    if (Vue === undefined) {
        setTimeout(() => {
            init()
        }, 200)
    }

    // Vue component initialization
    _app = new Vue({
        el: '#app',
        data: {
            // array invoices from JSON
            invoices: [],
            // invoice details that are clicked, filled with default / dummy data
            detailInvoice: {
                "type":"Checking",
                "accountName":"1267451**** - WOLFE",
                "status":"Active",
                "currency":"USD",
                "balance":"$6,266.33"
            },
        },
        mounted: function () {
            // when vue.js is mounted / loaded get a list of invoices from JSON
            this.fetchInvoices()
        },

        computed: {
            sortedInvoices: function () {
                // copy invoices so, the original doesn't change the order
                invoices = this.invoices.slice()
            },
        },    

        methods: {

            fetchInvoices: function () {
                // get invoice list from json file
                fetch('json/invoice_list.json')
                    // then return is string, change it to json
                    .then(result => result.json())
                    // then input the json to invoices
                    .then(json => {this.invoices = json})
            },

        }
    })
}

// call the init function when the window is loaded
window.onload = init