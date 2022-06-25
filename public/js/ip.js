var map = L.map('map').setView([0, 0], 2);

     var tiles = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
          maxZoom: 18,
          attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
               'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          id: 'mapbox/streets-v11',
          tileSize: 512,
          zoomOffset: -1
     }).addTo(map);
     
var popup = L.popup();

function onMapClick(e) {
     popup
          .setLatLng(e.latlng)
          .setContent("Localização: " + e.latlng.toString())
          .openOn(map);
}
map.on('click', onMapClick);

$(function() {
     $.getJSON("http://ip-api.com/json/?fields=61439",
        function(dados) {
             $.each(dados,function(p,s,){
               
               $(document.getElementById("meuip")).append("<td>&nbsp" +s+ " &nbsp</td>");           


          });

     });
  
})


function buscarip() {

     $("#buscar").click(function(){
          $('#saida').html("");
     });
     

     
     $.getJSON("http://ip-api.com/json/"+document.getElementById("nome").value+"?lang=pt-BR&fields=status",
          function(dados0) {
               
               $.each(dados0,function(k,m){
                    
                    if (m =="success"){
                         $.getJSON("http://ip-api.com/json/"+document.getElementById("nome").value+"?lang=pt-BR&fields=message,continent,country,region,regionName,city,isp,org,lat,lon,query",
                              function(dados2) {
                                   $.each(dados2,function(r,a,){
                         
                                        $(document.getElementById("saida")).append("<tr><td>"+r+"</td><td>"+a+"</td></tr>");
                         
                                   });
                              }
                         );
          
                         $.getJSON("http://ip-api.com/json/"+document.getElementById("nome").value+"?lang=pt-BR&fields=lat",
                              function(dados3) {
                                   $.each(dados3,function(j,f){
                                        lat = f;
                                   
                              
                                   });  
          
                              }
                         );
          
                         $.getJSON("http://ip-api.com/json/"+document.getElementById("nome").value+"?lang=pt-BR&fields=lon",
                              function(dados4) {
                                   $.each(dados4,function(p,q){
                                        long = q; 
                                   
                                   });        
                              }
                         );
                         var marker = L.marker([lat,long]).addTo(map);
                         marker.bindPopup("<b><n>"+document.getElementById("nome").value+"</b></n><br>Estar Aproximadamente !<br>Aqui").openPopup();
                         
                    }
                    
                    else{
                         
                         $(document.getElementById("saida")).append("IP Nao Localizado");
                   
                    }                

               });
          }
     );               

}
