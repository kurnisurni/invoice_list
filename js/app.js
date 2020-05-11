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

            // invoice details that are clicked, filled with default data/dummy 
            detailInvoice: {
                "type":"Checking",
                "accountName":"1267451**** - WOLFE",
                "status":"Active",
                "currency":"USD",
                "balance":"$6,266.33"
            },

            // detail panel shown/not
            detailPanelShown: false,

            sortBy: '',
            sortOrder: 'desc',
        },
        
        mounted: function () {
            // when vue.js is mounted / loaded get a list of invoices from JSON
            this.fetchInvoices()
        },

        computed: {
            sortedInvoices: function () {
                // copy invoices so, the original doesn't change the order
                invoices = this.invoices.slice()
                
                // sorting invoices
                sortBy = this.sortBy
                sortOrder = this.sortOrder
                invoices.sort((a, b) => {
                    // sortBy use because balance needs to be sorted by numbers
                    if (sortBy == 'balance') {
                        // remove $ as currency name
                        balanceA = a['balance'].replace('$', '')
                        balanceB = b['balance'].replace('$', '')

                        // remove ',' as thousand sign
                        balanceA = balanceA.replace(',', '')
                        balanceB = balanceB.replace(',', '')

                        // parse result to float
                        balanceA = parseFloat(balanceA)
                        balanceB = parseFloat(balanceB)
                        
                        if (sortOrder == 'asc') {
                            if (balanceA > balanceB) {
                                return 1
                            } else if (balanceA < balanceB) {
                                return -1
                            } else {
                                return 0
                            }
                        } else {
                            if (balanceA > balanceB) {
                                return -1
                            } else if (balanceA < balanceB) {
                                return 1
                            } else {
                                return 0
                            }
                        }
                    } else {
                        if (sortOrder == 'asc') {
                            if (a[sortBy] > b[sortBy]) {
                                return 1
                            } else if (a[sortBy] < b[sortBy]) {
                                return -1
                            } else {
                                return 0
                            }
                        } else {
                            if (a[sortBy] > b[sortBy]) {
                                return -1
                            } else if (a[sortBy] < b[sortBy]) {
                                return 1
                            } else {
                                return 0
                            }
                        }
                    }
                })
                return invoices
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

            showDetailPanel: function (invoice) {
                // set invoice detail from the parameter
                this.detailInvoice = invoice
                // set detailPanelShown = true, so detail panel appears.
                this.detailPanelShown = true
            },

            hideDetailPanel: function () {
                // set detailPanelShown = false to hide detail panel
                this.detailPanelShown = false
            },

            sort: function (sortBy) {
                // if sort is different, we set the new one
                if (this.sortBy != sortBy) {
                    this.sortBy = sortBy
                    this.sortOrder = 'asc'
                } else {
                    // if sort is same, toggle desc/asc
                    if (this.sortOrder == 'asc') {
                        this.sortOrder = 'desc'
                    } else {
                        this.sortOrder = 'asc'
                    }
                }
            },

        }
    })
}

// call the init function when the window is loaded
window.onload = init