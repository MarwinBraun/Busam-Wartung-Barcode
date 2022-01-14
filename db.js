function my () {
    var sql = require("mssql");
    
        // config for your database
        var config = {
            user: 'sa',
            password: 'kwpsarix',
            server: 'srv-sql', 
            database: 'BNWINS',
            options: {
              instanceName: 'KWP',
              trustServerCertificate: true
          }
    
    
    
        };
    
    
        // connect to your database
        sql.connect(config, function (err) {
        
            if (err) console.log(err);
    
            // create Request object
            var request = new sql.Request();
               
            // query to the database and get the records
            request.query(`select * from adradressen`, function (err, recordset) {
                
                if (err) console.log(err)
                
                var myarr = new Array();
    
                for (var i = 0; i < recordset.recordset.length; ++i) {
                  var InvoiceNumber = recordset.recordset[i].AdrNrGes;
                  var InvoiceDate = recordset.recordset[i].Strasse;
                  var Blob = recordset.recordset[i].Zusatz;
                  myarr.push({'Kürzel':InvoiceNumber,'Straße':InvoiceDate,'Zusatz':Blob});
    
              }   
              let d = 0;
    
              myarr.map((record) => {
                d += 1;
              })
    
              console.log(d);
                // send records as a response
                //console.log(myarr);
    /*
                let i = 0;
                JSON.stringify(recordset);
                JSON.parse(recordset);
    
                recordset.map((record) => {
                  i += 1;
                })
    
                console.log(i);
    */
    //res.send(recordset);
                
            });
        });
        
    
      }
    
      setInterval(my, 2000);