console.log('GameTime')

/************ Unit 3 *****************/

/******************** Basic Info **************/
$('fieldset div').first().hide(); // hide "other" on load

//show "other" role input field
$('#title').on('change', () => { $('#title').val() === $('#title option').last().val() ?
    $('fieldset div').first().show() :
    $('fieldset div').first().hide()
});
/******************** T-Shirt Info **************/
$('#design option').first().hide(); // remove select theme option
$('#color').hide(); // hide color select menu

$('#design').on('change', function(){
    $("#color").show();
    
    const $options = $("#design option").not($("#design option").first()); // excludes "select theme" in arr
    if ($('#design').val() === $options.first().val()){
        $('#color option').first().attr('selected', true);
        $('#color option').eq(3).attr('selected', false);

        $('#color option').each(function(index, element){
            index <= 2 ? $(element).show() : $(element).hide();
        })
    } else {
        $('#color option').first().attr('selected', false);
        $('#color option').eq(3).attr('selected', true);

        $("#color option").each(function(index, element) {
            index >= 3 ? $(element).show() : $(element).hide();
        });
    }
})

/******************** Activities Info **************/
let total = 0;
const $label = $('<label></label>'); // create total label
$('.activities').append($label) // add to activities

// if certain boxes are checked disable attr must be added to others @ same time
                
$('.activities input').each(function(index){
    $('.activities input').eq(index).on('change', function(){
        let $selectedInput = $(".activities input").eq(index);

        if ($selectedInput.attr("name") === "all" && $selectedInput.prop('checked')) {
            total += 200;
        } else if ($selectedInput.attr("name") === "all" && !$selectedInput.prop('checked')) {
            total -= 200;
        }
        
        if ($selectedInput.attr("name") === "js-frameworks" && $selectedInput.prop('checked')) {
            $(".activities label").eq(3).toggleClass("disabled");
            $(".activities input").eq(3).attr("disabled", true);
            total += 100;
            $label.text("Total:" + total);

        } else if ($selectedInput.attr("name") === "express" && $selectedInput.prop('checked')) {

            $(".activities label").eq(1).toggleClass("disabled");
            $(".activities input").eq(1).attr("disabled", true);
            total += 100;
            $label.text("Total:" + total);
        } else if ($selectedInput.attr("name") === "express" && !$selectedInput.prop('checked') || $selectedInput.attr("name") === "js-frameworks" && !$selectedInput.prop('checked')) {
            
            $(".activities label").eq(1).removeClass("disabled");
            $(".activities input").eq(1).attr("disabled", false);

            $(".activities label").eq(3).removeClass("disabled");
            $(".activities input").eq(3).attr("disabled", false);

            total -= 100
            $label.text("Total:" + total);
        }     

        if ($selectedInput.attr("name") === "js-libs" && $selectedInput.prop('checked')) {
            $(".activities label").eq(4).toggleClass("disabled");
            $(".activities input").eq(4).attr("disabled", true);
            total += 100;
            $label.text("Total:" + total);

        } else if ($selectedInput.attr("name") === "node" && $selectedInput.prop('checked')) {

            $(".activities label").eq(2).toggleClass("disabled");
            $(".activities input").eq(2).attr("disabled", true);
            total += 100;
            $label.text("Total:" + total);
        } else if ($selectedInput.attr("name") === "js-libs" && !$selectedInput.prop('checked') || $selectedInput.attr("name") === "node" && !$selectedInput.prop('checked')) {

            $(".activities label").eq(2).removeClass("disabled");
            $(".activities input").eq(2).attr("disabled", false);

            $(".activities label").eq(4).removeClass("disabled");
            $(".activities input").eq(4).attr("disabled", false);

            total -= 100
            $label.text("Total:" + total);
        }

        if ($selectedInput.attr("name") === ("build-tools") && $selectedInput.prop('checked') || $selectedInput.attr("name") ===("npm") && $selectedInput.prop('checked')) {
            total += 100;
        } else if ($selectedInput.attr("name") === ("build-tools") && !$selectedInput.prop('checked') || $selectedInput.attr("name") === ("npm") && !$selectedInput.prop('checked')) {
            total -= 100;
        }

        $label.text('Total:' + total);
    });
});

/******************** Payment Info **************/

const $paymentParagraphs = $('div p');
$paymentParagraphs.hide(); // hide all p elements

$('#payment option').eq(0).hide(); 
$('#payment option').eq(1).attr('selected',true); // auto select CC option

$('#payment').on('change',function(){ 

    if ($('#payment').val() === 'paypal'){
        $paymentParagraphs.eq(0).show(); //show() paypal
        $paymentParagraphs.eq(1).hide(); // hide() bitcoin if it's showing
        $('#credit-card').hide(); 
        
       assignAttr($('#payment option'),2);
    } else if ($('#payment').val() === 'bitcoin'){ 
        $paymentParagraphs.eq(1).show(); //show() bitcoin
        $paymentParagraphs.eq(0).hide() // hide() paypal if it's showing
        $('#credit-card').hide(); 

        assignAttr($('payment option'), 3);
    } else {
        $('#credit-card').show();  
        $paymentParagraphs.eq(0).hide(); //hide() paypal
        $paymentParagraphs.eq(1).hide(); //hide() bitcoin

        assignAttr($('payment option'),1);
    }
})

assignAttr = (arr,num) => {
    $(arr).each(function (index, element) {
        index === num ? $(element).attr('selected', true) : $(element).attr('selected', false)
    })
}

/************************ Form Validation *****************/

// create variables
const userName = document.getElementById('name');
const userEmail = document.getElementById('mail');
const userCC = document.getElementById('cc-num');
const userZip = document.getElementById('zip');
const userCVV = document.getElementById('cvv');

//event listeners to test validation
// name field
let name = false;

userName.addEventListener('input', () => {

    let $nameReg = new RegExp('^[A-Za-z]*\\s?[A-Za-z]+$');
    const isValidName = $nameReg.test($('input#name').val())
    if(isValidName){
        $('input#name').css('color','black')
        name = true;
    } else {
        $('input#name').css('color','red')
    
    }

})

 // email field 
 let email = false;

userEmail.addEventListener('input',() => {
    let $emailReg = new RegExp('^[^@]+@[^\\.]+\\.[a-z]+$');
    const isValidEmail = $emailReg.test($('input#mail').val())
    if(isValidEmail){
        $('input#mail').css('color','black')
        email = true;
    } else {
        $('input#mail').css('color','red')
        console.log('bad')
    }
    
})

// cc field
let cc = false;

userCC.addEventListener('input',() =>{
    let $cardReg = new RegExp('^\\d{13,16}$');
    const isValidCard = $cardReg.test($('input#cc-num').val())
    if(isValidCard){
        $('input#cc-num').css('color','black')
        cc = true
    } else {
        $('input#cc-num').css('color','red')
        console.log('bad')
    }
})

// //zip field
let zip = false

userZip.addEventListener('input', () =>{
    let $zipReg = new RegExp ('^\\d{5}$')
    const isValidZip = $zipReg.test($('input#zip').val())
    if(isValidZip){
        $('input#zip').css('color','black');
        zip = true;
    } else {
        $('input#zip').css('color','red')
    }
})

//cvv field
let cvv = false

userCVV.addEventListener('input', () => {
    let $cvvReg = new RegExp ('^\\d{3}$')
    const isValidCVV = $cvvReg.test($('input#cvv').val())

    if(isValidCVV){
        $('input#cvv').css('color','black');
        cvv = true
    } else {
        $('input#cvv').css('color','red')
    }

})

/*********** Prevent Default **************/

const $button = $('button');
$button.on('click', function(event){
    resetStyles();

    if($('input:checked').length === 0){
        event.preventDefault();
        $(".activities legend").css({ "color": "red"});
    }
    if (!name || !email) {
        event.preventDefault();
        $("fieldset legend").first().css({"color": "red"});
        if(!name && !email){
            $("#name").css({ "border-color": "red" })
            $("#mail").css({ "border-color": "red" });
        } else if (!name){
            $("#name").css({ "border-color": "red" })
        } else {
            $("#mail").css({ "border-color": "red" });
        }
    }
    if($('#payment option:selected').val() === 'credit card'){
        if (!cc || !zip || !cvv){
            event.preventDefault();
            $('fieldset legend').last().css('color', 'red');
            if (!cc){
                $("#cc-num").css({ "border-color": "red" });
            }
            if (!zip){
                $("#zip").css({ "border-color": "red" });
            }
            if (!cvv){
                $("#cvv").css({ "border-color": "red" });
            }
        }
    }    
})

resetStyles = () => {
    $("legend").each(function() {
      $("legend").css({ color: "#184f68" });
    });
    $("#name").css({ "border-color": "#5e97b0" });
    $("#mail").css({ "border-color": "#5e97b0" });
    $("#cc-num").css({ "border-color": "#5e97b0" });
    $("#zip").css({ "border-color": "#5e97b0" });
    $("#cvv").css({ "border-color": "#5e97b0" });
}