$('#sign').submit(function() {
    var form = $(this);
    $('.t1').addClass("semfunc");
    $.post(form.attr('action'), form.serialize(), function(retorno) {
        
        var iName = $('#aunome').val()
        var iPass = $('#ausenha').val()
        if (iName == '' || iPass == '') {
            $('.t1').removeClass("semfunc");
        } else{
            $('.pre1').removeClass("semfunc");
            $.ajax({
                url : "/autentica/",
                type : "POST",
                data : { 
                    username : iName,
                    password : iPass,
                     },

                success : function(json) {
                    if (json == true) {
                        parent.window.document.location.href = '/';
                    } else {
                        $('.pre1').addClass("semfunc");
                        $('.t1').removeClass("semfunc");
                        
                    }            
                },

                error : function(xhr,errmsg,err) {
                    console.log(xhr.status + ": " + xhr.responseText);
                   $('.pre1').addClass("semfunc");
                   $('.t1').removeClass("semfunc");

                }
            }); 
        }
    });
    return false;
});

$('#register').submit(function() {
    var form = $(this);
    $('.t1').addClass("semfunc");
    $.post(form.attr('action'), form.serialize(), function(retorno) {
        
        var iName = $('#nomer').val();
        var iEmail = $('#emailr').val();
        var iSenha = $('#passwordr').val();

        if (iName == '' || iEmail == '' || iSenha == '') {
            $('.t2').removeClass("semfunc");
        } else{
            $('.pre2').removeClass("semfunc");
            $.ajax({
                url : "/registra/",
                type : "POST",
                data : { 
                    username : iName,
                    email : iEmail,
                    password : iSenha,
                     },

                success : function(json) {
                    console.log("Resultado do processamento: "+json);
                    if (json == true) {
                        parent.window.document.location.href = '/';
                    } else {
                        $('.pre2').addClass("semfunc");
                        $('.t2').removeClass("semfunc");
                        
                    }            
                },

                error : function(xhr,errmsg,err) {
                    console.log(xhr.status + ": " + xhr.responseText);
                   $('.pre2').addClass("semfunc");
                   $('.t2').removeClass("semfunc");

                }
            }); 
        }
    });
    return false;
});

function delete_account(){
    $.ajax({
        url : "/deletaconta/",
        type : "GET",
        
        success : function(json) {
            if (json == true) {
                parent.window.document.location.href = '';
            } else {
                alert("Something went wrong....");
            }            
        },

        error : function(xhr,errmsg,err) {
            console.log(xhr.status + ": " + xhr.responseText);
           alert("Something went wrong.")

        }
    }); 
       
}

var form = new FormData();
    $('#imagem').change(function (event) {
        form.append('image', event.target.files[0]); // para apenas 1 arquivo
        //var nameee = event.target.files[0].content; // para capturar o nome do arquivo com sua extenção
    });

function addHouse(){
    console.log("apertado");
    var name = $("#name").val();
    var server = $("#server").val();
    var user = $("#user").val();
    var password = $("#password").val();
    var port = $("#port").val();
    
    form.append('name', name);
    form.append('server', server);
    form.append('user', user);
    form.append('password', password);
    form.append('portws', port);    

    
    $.ajax({
        url : "/house/add/",
        type : "POST",
        data : form,
        processData: false,
        contentType: false,



        success : function(json) {
            console.log("Resultado do processamento: "+json);
            if (json == true) {
                parent.window.document.location.href = '/';
            } else {
                Materialize.toast('Complete todos os campos', 4000);
                //$('.loadadd').addClass("semfunc");
            }            
        },

        error : function(xhr,errmsg,err) {
            console.log(xhr.status + ": " + xhr.responseText);
           Materialize.toast('Erro: '+xhr.status, 4000);
           //$('.loadadd').addClass("semfunc");

        }
    }); 
        

    return false;

    
    
}


var formProfile = new FormData();
    $('#profile').change(function (event) {
        console.log("mudou a foto de perfil");
        formProfile.append('profile', event.target.files[0]); // para apenas 1 arquivo
        //var nameee = event.target.files[0].content; // para capturar o nome do arquivo com sua extenção
    });
    $('#cover').change(function (event) {
        formProfile.append('cover', event.target.files[0]); // para apenas 1 arquivo
        //var nameee = event.target.files[0].content; // para capturar o nome do arquivo com sua extenção
    });

function editProfile(){
    console.log("apertado");
    var username = $("#username").val();
    var email= $("#email").val();

    
    formProfile.append('username', username);
    formProfile.append('email', email); 

    
    $.ajax({
        url : "/edit_profile/",
        type : "POST",
        data : formProfile,
        processData: false,
        contentType: false,



        success : function(json) {
            console.log("Resultado do processamento: "+json);
            if (json == true) {
                parent.window.document.location.href = '/';
            } else {
                Materialize.toast('Complete todos os campos', 4000);
                //$('.loadadd').addClass("semfunc");
            }            
        },

        error : function(xhr,errmsg,err) {
            console.log(xhr.status + ": " + xhr.responseText);
           Materialize.toast('Erro: '+xhr.status, 4000);
           //$('.loadadd').addClass("semfunc");

        }
    }); 
        

    return false;

    
    
}

//var idHouse = 0;

function addMessage(idHouse, message){
    console.log("Evento para adicionar mensagem");
    m = new Paho.MQTT.Message(message);
    m.destinationName = 'm';
    client.send(m);
    Materialize.toast('Mensagem publicada no ambiente', 340);
    //$('.loadadd').removeClass("semfunc");
    
    $.ajax({
        url : "/house/add/message/",
        type : "POST",
        data : { 
            house : idHouse,
            message : message,
            is_m : '1'
             },



        success : function(json) {
            console.log("Resultado do processamento: "+json);
            if (json == true) {
                Materialize.toast('Mensagem salva no banco de dados', 540);
            } else {
                Materialize.toast('Complete todos os campos', 4000);
                //$('.loadadd').addClass("semfunc");
            }            
        },

        error : function(xhr,errmsg,err) {
            console.log(xhr.status + ": " + xhr.responseText);
           Materialize.toast('Erro: '+xhr.status, 4000);
           //$('.loadadd').addClass("semfunc");

        }
    });    
}

$('#f').submit(function() {
    var form = $(this);
    $.post(form.attr('action'), form.serialize(), function(retorno) {
        if ($("#pesquisa").val() !== "") {
        var searchValue = $("#pesquisa").val();
          console.log($("#pesquisa").val());
          //window.location.replace("/search="+ $("#pesquisa").val() +"");
        }
    });
    return false;
});

function search_users(idHouse, message){
    console.log("Evento para adicionar mensagem");
    //$('.loadadd').removeClass("semfunc");
    
    $.ajax({
        url : "/house/search_users/",
        type : "POST",
        data : { 
            house : idHouse,
            message : message
             },
        success : function(json) {
            $('.resultData').html("");
            $('.resultTxt').html("");
            
            if (json != false) {

                console.log("Resultado do processamento: "+json);
                  $('.resultTxt').html(
                '<h6>Resultados para <i>'+ message +'</i>:<h6>');
                for (var i = json.length - 1; i >= 0; i--) {
                    $('.resultData').append("<li class='collection-item'><div><a href='#'><b>"+ json[i].username +"</b><span style='color: black;''> (" + json[i].email +")</span></a><a id='idsuserlink"+json[i].pk+"' href='#' onclick='add_user("+json[i].pk+", "+idHouse+")' class='secondary-content'><i class='material-icons idsuser"+json[i].pk+"'>person_add</i></a></div></li>");
                    console.log(json[i].username);
                }
                //parent.window.document.location.href = '';
            } else {
                Materialize.toast('Nenhum resultado', 4000);
                //$('.loadadd').addClass("semfunc");
            }            
        },

        error : function(xhr,errmsg,err) {
            console.log(xhr.status + ": " + xhr.responseText);
           Materialize.toast('Erro: '+xhr.status, 4000);
           //$('.loadadd').addClass("semfunc");

        }
    }); 
    return false;
}

function add_user(idUser, idHouse) {
    $.ajax({
        url : "/house/add_user/",
        type : "POST",
        data : { 
            house : idHouse,
            iduser : idUser
             },
        success : function(json) {
            if (json != false) {
                $('.idsuser'+idUser).html("clear");
                $('#idsuserlink'+idUser).attr("onclick", "remove_user("+idUser+","+idHouse+")")
                console.log("Resultado do processamento: "+json);
                Materialize.toast('Membro adicionado!', 4000);
                $('.warn').html("<p>*Algumas mudanças foram feitas. Recarregue a página para ver a lista atualizada.</p><a class='waves-effect waves-light btn' href=''><i class='material-icons right'>loop</i>Atualizar lista</a>");
                 
                //parent.window.document.location.href = '';
            } else {
                Materialize.toast('Nenhum resultado', 4000);
                //$('.loadadd').addClass("semfunc");
            }            
        },

        error : function(xhr,errmsg,err) {
            console.log(xhr.status + ": " + xhr.responseText);
           Materialize.toast('Erro: '+xhr.status, 4000);
           //$('.loadadd').addClass("semfunc");

        }
    }); 
    return false;
}

function add_actuator(name, topic, desc, idactuator, idhouse) {
    $.ajax({
        url : "/house/add_actuator/",
        type : "POST",
        data : { 
            name : name,
            topic : topic,
            desc : desc,
            idactuator : idactuator,
            idhouse : idhouse
             },
        success : function(json) {
            if (json != false) {
                console.log("Resultado do processamento: "+json);
                Materialize.toast('Atuador/sensor salvo!', 4000);
                $('.warn').html("<p>*Algumas mudanças foram feitas. Recarregue a página para ver a lista atualizada.</p><a class='waves-effect waves-light btn' href=''><i class='material-icons right'>loop</i>Atualizar lista</a>");
                 
                //parent.window.document.location.href = '';
            } else {
                Materialize.toast('Erro! Verifique se todos os campos foram completados.', 4000);
                //$('.loadadd').addClass("semfunc");
            }            
        },

        error : function(xhr,errmsg,err) {
            console.log(xhr.status + ": " + xhr.responseText);
           Materialize.toast('Erro: '+xhr.status, 4000);
           //$('.loadadd').addClass("semfunc");

        }
    }); 
    return false;
}

function remove_actuator(idActuator, idHouse) {
    console.log(idActuator);
    console.log(idHouse);
    $.ajax({
        url : "/house/remove_actuator/",
        type : "POST",
        data : { 
            actuator : idActuator,
            house : idHouse
             },
        success : function(json) {
            if (json != false) {
                $('#idsactuator'+idActuator).css("text-decoration", "line-through");
                $('#idsactuatorlink'+idActuator).html("");
                console.log("Resultado do processamento: "+json);
                Materialize.toast('Atuador/sensor removido!', 4000);
                $('.warn').html("<p>*Algumas mudanças foram feitas. Recarregue a página para ver a lista atualizada.</p><a class='waves-effect waves-light btn' href=''><i class='material-icons right'>loop</i>Atualizar lista</a>");
                 
                //parent.window.document.location.href = '';
            } else {
                Materialize.toast('Nenhum resultado', 4000);
                //$('.loadadd').addClass("semfunc");
            }            
        },

        error : function(xhr,errmsg,err) {
            console.log(xhr.status + ": " + xhr.responseText);
           Materialize.toast('Erro: '+xhr.status, 4000);
           //$('.loadadd').addClass("semfunc");

        }
    }); 
    return false;
}

function remove_user(idUser, idHouse) {
    $.ajax({
        url : "/house/remove_user/",
        type : "POST",
        data : { 
            house : idHouse,
            iduser : idUser
             },
        success : function(json) {
            if (json != false) {
                $('.idsuser'+idUser).html("person_add");
                $('#idsuserlink'+idUser).attr("onclick", "add_user("+idUser+","+idHouse+")")
                console.log("Resultado do processamento: "+json);
                Materialize.toast('Membro removido!', 4000);
                $('.warn').html("<p>*Algumas mudanças foram feitas. Recarregue a página para ver a lista atualizada.</p><a class='waves-effect waves-light btn' href=''><i class='material-icons right'>loop</i>Atualizar lista</a>");
                 
                //parent.window.document.location.href = '';
            } else {
                Materialize.toast('Nenhum resultado', 4000);
                //$('.loadadd').addClass("semfunc");
            }            
        },

        error : function(xhr,errmsg,err) {
            console.log(xhr.status + ": " + xhr.responseText);
           Materialize.toast('Erro: '+xhr.status, 4000);
           //$('.loadadd').addClass("semfunc");

        }
    }); 
    return false;
}

function addTopic(idHouse, topic, message) {
    m = new Paho.MQTT.Message(message);
    m.destinationName = topic;
    client.send(m);
    Materialize.toast('Mensagem publicada no ambiente', 540);
    addAction(idHouse, 'publicou o tópico <b>'+ topic +'</b> com a mensagem <b> '+message+' </b>');
}

function addAction(idHouse, message){

    //$('.loadadd').removeClass("semfunc");
    
    $.ajax({
        url : "/house/add/message/",
        type : "POST",
        data : { 
            house : idHouse,
            message : message,
            is_m : '0'
             },



        success : function(json) {
            console.log("Resultado do processamento: "+json);
            if (json == true) {
                //Materialize.toast('Mensagem salva no banco de dados', 24000);
            } else {
                Materialize.toast('Complete todos os campos', 4000);
                //$('.loadadd').addClass("semfunc");
            }            
        },

        error : function(xhr,errmsg,err) {
            console.log(xhr.status + ": " + xhr.responseText);
           Materialize.toast('Erro: '+xhr.status, 4000);
           //$('.loadadd').addClass("semfunc");

        }
    });    
}

function alterCheck(nameAc, numAc, topicAc) {
    console.log(nameAc);
    console.log($('#element'+numAc).prop('checked'));

    bool = $('#element'+numAc).prop('checked');

    if(bool == true){
        m = new Paho.MQTT.Message('on');
    }else{
        m = new Paho.MQTT.Message('off');
    }

    console.log(m);
    m.destinationName = topicAc;
    client.send(m);
    Materialize.toast('Mensagem publicada no ambiente. Aguarde a confirmação...', 540);
    $('#element'+numAc).prop('disabled', 'true');
    if(bool == true){
        addAction(idHouse, 'ligou o atuador <b>"'+ nameAc + '"</b>');
    }else{
        addAction(idHouse, 'desligou o atuador <b>"'+ nameAc + '"</b>');
    }

}


function deleteHouse(idHouse){

    //$('.loadadd').removeClass("semfunc");
    
    $.ajax({
        url : "/house/delete_house/",
        type : "POST",
        data : { 
            house : idHouse
             },



        success : function(json) {
            console.log("Resultado do processamento: "+json);
            if (json == true) {
                parent.window.document.location.href = '/';
            } else {
                Materialize.toast('Erro', 4000);
                //$('.loadadd').addClass("semfunc");
            }            
        },

        error : function(xhr,errmsg,err) {
            console.log(xhr.status + ": " + xhr.responseText);
           Materialize.toast('Erro: '+xhr.status, 4000);
           //$('.loadadd').addClass("semfunc");

        }
    });    
}

//Cookies globais padrões para utilização do AJAX

function getCookie(name) {
        var cookieValue = null;
        var i = 0;
        if (document.cookie && document.cookie !== '') {
            var cookies = document.cookie.split(';');
            for (i; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
    var csrftoken = getCookie('csrftoken');

    function csrfSafeMethod(method) {
        // these HTTP methods do not require CSRF protection
        return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
    }
    $.ajaxSetup({
        crossDomain: false, // obviates need for sameOrigin test
        beforeSend: function(xhr, settings) {
            if (!csrfSafeMethod(settings.type)) {
                xhr.setRequestHeader("X-CSRFToken", csrftoken);
            }
        }
    });


var id = 6;



$( document ).ready( function() {


  
//Google Maps JS
//Set Map
function initialize() {
        var myLatlng = new google.maps.LatLng(parseFloat(adata["lat"]),parseFloat(adata["lon"]));
        var imagePath = 'http://m.schuepfen.ch/icons/helveticons/black/60/Pin-location.png'
        var mapOptions = {
            zoom: 17,
            center: myLatlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }

    var map = new google.maps.Map(document.getElementById('map'), mapOptions);
    //Callout Content
    var contentString = 'Some address here..';
    //Set window width + content
    var infowindow = new google.maps.InfoWindow({
        content: contentString,
        maxWidth: 500,
    });

    //Add Marker
    var marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        icon: imagePath,
        title: 'image title'
    });

    google.maps.event.addListener(marker, 'click', function() {
        infowindow.open(map,marker);
    });

    //Resize Function
    google.maps.event.addDomListener(window, "resize", function() {
        var center = map.getCenter();
        google.maps.event.trigger(map, "resize");
        map.setCenter(center);
    });
}

google.maps.event.addDomListener(window, 'load', initialize);

});
jQuery(document).ready(function($) { 
    $(".scroll").click(function(event){        
        event.preventDefault();
        $('html,body').animate({scrollTop:$(this.hash).offset().top}, 600);
   });
});
