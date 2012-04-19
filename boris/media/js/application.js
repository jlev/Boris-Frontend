(function() {
<<<<<<< HEAD
  var getCityState, getStateRequirements, initForm, showRegistrationForm, submitStartForm, validateAddress, validateBirthday, validateChangedName, validateCitizenship, validateCity, validateEmail, validateFirstName, validateIDNumber, validateLastName, validateMailingAddress, validateParty, validatePhoneNumber, validateRace, validateRecentlyMoved, validateState, validateTitle, validateZip;
=======
  var getCityState, getStateRequirements, initForm, showRegistrationForm, submitRegistrationForm, submitStartForm, validateAddress, validateBirthday, validateChangedName, validateCitizenship, validateCity, validateEmail, validateFirstName, validateIDNumber, validateLastName, validateMailingAddress, validateParty, validatePhoneNumber, validateRace, validateRecentlyMoved, validateState, validateTitle, validateZip;
>>>>>>> origin/master

  validateAddress = function($input) {
    return $input.val().length > 0;
  };

  validateZip = function($input) {
    return $input.val().length === 5;
  };

  validateCity = function($input) {
    return $input.val().length > 0;
  };

  validateState = function($input) {
    return $input.val() > 0;
  };

  validateMailingAddress = function($input) {
    if ($input.attr("checked") === "checked") {
      /* Validate Mailing Address
      */
      if (!validateAddress($('#mailing_address'))) return false;
      if (!validateState($('#mailing_state'))) return false;
      if (!validateCity($('#mailing_city'))) return false;
      if (!validateZip($('#mailing_zip_code'))) return false;
    } else {
      return true;
    }
  };

  validateRecentlyMoved = function($input) {
    if ($input.attr("checked") === "checked") {
      /* TODO: Validate Previous Address
      */
      if (!validateAddress($('#prev_address'))) return false;
      if (!validateState($('#prev_state'))) return false;
      if (!validateCity($('#prev_city'))) return false;
      if (!validateZip($('#prev_zip_code'))) return false;
    } else {
      return true;
    }
  };

  validateTitle = function($input) {
    return $input.val().length > 0;
  };

  validateFirstName = function($input) {
    return $input.val().length > 0;
  };

  validateLastName = function($input) {
    return $input.val().length > 0;
  };

  validateChangedName = function($input) {
    if ($input.attr("checked") === "checked") {
      /* Validate Previous Name
      */
      if (!validateTitle($('#prev_name_title'))) return false;
      if (!validateFirstName($('#prev_first_name'))) return false;
      if (!validateLastName($('#prev_last_name'))) return false;
    } else {
      return true;
    }
  };

  validateIDNumber = function($input) {
    var idLength, maxLength, minLength;
    maxLength = $input.attr("data-maxlength");
    minLength = $input.attr("data-minlength");
    idLength = $input.val().length;
    if (minLength > idLength || idLength > maxLength) {
      return false;
    } else {
      return true;
    }
  };

  validateBirthday = function($input) {
    var age, birthday, m, today;
    today = new Date();
    birthday = new Date($input.val());
    age = today.getFullYear() - birthday.getFullYear();
    m = today.getMonth() - birthday.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthday.getDate())) age--;
    if (age < 18) {
      return false;
    } else {
      return true;
    }
  };

  validateEmail = function($input) {
    var re;
    re = /^(([^<>()\[\]\\.,;:\s@\"]+(\.[^<>()\[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test($input.val());
  };

  validatePhoneNumber = function($input) {
    var re;
    re = /(1-)?[(]*(\d{3})[) -.]*(\d{3})[ -.]*(\d{4})\D*/;
    return re.test($input.val());
  };

  validateRace = function($input) {
    var required;
    required = $input.attr("data-required");
    if (required === true && ($input.val().length = 0)) {
      return false;
    } else {
      return true;
    }
  };

  validateParty = function($input) {
    var required;
    required = $input.attr("data-required");
    if (required === true && ($input.val().length = 0)) {
      return false;
    } else {
      return true;
    }
  };

  validateCitizenship = function($input) {
    if ($input.attr("checked") !== "checked") {
      return false;
    } else {
      return true;
    }
  };

  /* -------------------------------------------- 
       Begin staterequirements.coffee 
  --------------------------------------------
  */

  showRegistrationForm = function() {
    var email, firstName, lastName, zip;
    firstName = $('#pre_first_name').val();
    lastName = $('#pre_last_name').val();
    email = $('#pre_email_address').val();
    zip = $('#pre_zip_code');
    $('#first_name').val(firstName);
    $('#last_name').val(lastName);
    $('#email_address').val(email);
    $('#home_zip_code').val(zip);
    $('#state_form').hide();
    return $('#registration_form').show();
  };

  getCityState = function(zip) {
    return $.ajax({
      type: 'get',
      url: '/usps/zip_lookup/',
      data: {
        zip: zip
      },
      success: function(data) {
        /* Handle City and State Data
        */        $("form#ovr #home_zip_code").val(data.zip);
        $("form#ovr #home_city").val(data.city);
        $("form#ovr #home_state_id").val(data.state);
        return getStateRequirements();
      },
      error: function(error) {
        /* TODO: Handle Error
        */
      }
    });
  };

  getStateRequirements = function() {
    var data, url;
    url = "/api/v1/state_requirements.json";
    data = {};
    data["'home_zip_code'"] = $('#pre_zip_code').val();
    data["'lang'"] = $('#lang_id').val();
    return $.ajax({
      url: url,
      data: data,
      type: 'get',
      success: function(response) {
        /* Handle Political Parties
        */
        var $target, html, i, maxLength, minLength, parties, party, _i, _len;
        if (response.party_list) {
          parties = response.party_list;
          $target = $('select#party');
          html = "";
          for (_i = 0, _len = parties.length; _i < _len; _i++) {
            i = parties[_i];
            /* generate html
            */
            party = parties[i];
            html += "<option val=" + party + ">" + party + "</option>\n";
          }
          if (response.no_party_msg === "Decline to state") {
            html += "<option val=\"Decline to state\">Decline to state</option>\n";
          }
          /* append HTML
          */
          $target.append(html);
        }
        /* Handle Required Fields
        */
        if (response.requires_party) $('#party').attr('data-required', true);
        if (response.requires_party) $('#party').attr('data-required', true);
        /* Handle Help Text
        */
        if (response.id_number_msg) {
          $('#tooltip_text_id_number').text(response.id_number_msg);
        }
        if (response.requires_party_msg) {
          $('#tooltip_text_party').text(response.requires_party_msg);
        }
        if (response.requires_race_msg) {
          $('#tooltip_text_race').text(response.requires_race_msg);
        }
        /* Handle ID Validation Requirements
        */
        minLength = response.id_min_length || 0;
        maxLength = response.id_max_length || 100;
        $('#id_number').attr('data-maxlength', maxLength).attr('data-minlength', minLength);
        /* Handle SOS Contact Info (where is this used?)
        */
        /* Callback to advance form
        */
        return showRegistrationForm();
      },
      error: function(error) {
        /* TODO: Handle Error
        */
      }
    });
  };

  /* -------------------------------------------- 
       Begin form.coffee 
  --------------------------------------------
  */

  /* Form Logic
  */

  submitStartForm = function() {
<<<<<<< HEAD
    return getCityState($("#pre_zip_code").val());
=======
    var $email, $firstname, $lastname, $zip, errors, i, _i, _len;
    $firstname = $("#pre_first_name");
    $lastname = $("#pre_last_name");
    $email = $("#pre_email_address");
    $zip = $("#pre_zip_code");
    errors = [];
    if (!validateFirstName($firstname)) {
      errors.push({
        id: $firstname.attr('id'),
        msg: "First Name is Required"
      });
    }
    if (!validateLastName($lastname)) {
      errors.push({
        id: $lastname.attr('id'),
        msg: "Last Name is Required"
      });
    }
    if (!validateEmail($email)) {
      errors.push({
        id: $email.attr('id'),
        msg: "Enter a Valid Email Address"
      });
    }
    if (!validateZip($zip)) {
      errors.push({
        id: $zip.attr('id'),
        msg: "Please Enter a Valid Zip Code"
      });
    }
    if (errors.length < 0) {
      for (_i = 0, _len = errors.length; _i < _len; _i++) {
        i = errors[_i];
        $(errors[i].id).addClass('error').prepend("<span class='error-message'>" + errors[i].msg + "</span>");
      }
      return false;
    } else {
      return getCityState($("#pre_zip_code").val());
    }
  };

  submitRegistrationForm = function() {
    var $address, $city, $dob, $email, $firstname, $idnumber, $lastname, $mailingaddress, $namechange, $phone, $prevaddress, $state, $title, $zip, errors, i, _i, _len;
    $title = $("#name_title");
    $firstname = $("#first_name");
    $lastname = $("#last_name");
    $namechange = $("#change_of_name");
    $idnumber = $("#id_number");
    $dob = $("#date_of_birth");
    $email = $("#email_address");
    $phone = $("#phone");
    $address = $("#home_address");
    $city = $("#home_city");
    $state = $("#home_state_id");
    $zip = $("#zip_code");
    $mailingaddress = $("#has_different_address");
    $prevaddress = $("#change_of_address");
    errors = [];
    if (!validateTitle($title)) {
      errors.push({
        id: $title.attr('id'),
        msg: "Title is Required"
      });
    }
    if (!validateFirstName($firstname)) {
      errors.push({
        id: $firstname.attr('id'),
        msg: "First Name is Required"
      });
    }
    if (!validateLastName($lastname)) {
      errors.push({
        id: $lastname.attr('id'),
        msg: "Last Name is Required"
      });
    }
    if (!validateEmail($email)) {
      errors.push({
        id: $email.attr('id'),
        msg: "Enter a Valid Email Address"
      });
    }
    if (!validateZip($zip)) {
      errors.push({
        id: $zip.attr('id'),
        msg: "Please Enter a Valid Zip Code"
      });
    }
    if (!validateChangedName($namechange)) {
      errors.push({
        id: $namechange.attr('id'),
        msg: "Please include your previous name"
      });
    }
    if (!validateIDNumber($idnumber)) {
      errors.push({
        id: $idnumber.attr('id'),
        msg: "Please enter a valid ID Number"
      });
    }
    if (!validateBirthday($dob)) {
      errors.push({
        id: $dob.attr('id'),
        msg: "Please enter a valid date in a MM/DD/YYYY format, you must be 18 years old to register"
      });
    }
    if (!validatePhoneNumber($phone)) {
      errors.push({
        id: $phone.attr('id'),
        msg: "Enter a valid phone number"
      });
    }
    if (!validateAddress($address)) {
      errors.push({
        id: $address.attr('id'),
        msg: "Address is Required"
      });
    }
    if (!validateCity($city)) {
      errors.push({
        id: $city.attr('id'),
        msg: "City is Required"
      });
    }
    if (!validateState($state)) {
      errors.push({
        id: $state.attr('id'),
        msg: "State is Required"
      });
    }
    if (!validateMailingAddress($mailingaddress)) {
      errors.push({
        id: $mailingaddress.attr('id'),
        msg: "Please enter your mailing address"
      });
    }
    if (!validateRecentlyMoved($prevaddress)) {
      errors.push({
        id: $prevaddress.attr('id'),
        msg: "Please enter your previous address information"
      });
    }
    if (errors.length < 0) {
      for (_i = 0, _len = errors.length; _i < _len; _i++) {
        i = errors[_i];
        $(errors[i].id).addClass('error').prepend("<span class='error-message'>" + errors[i].msg + "</span>");
      }
      return false;
    } else {
      return getCityState($("#pre_zip_code").val());
    }
>>>>>>> origin/master
  };

  initForm = function() {
    $("#registration_form").hide();
    $(".mailing").hide();
    $(".name-change").hide();
    $(".address-change").hide();
<<<<<<< HEAD
    return $("form#get_started").submit(function(e) {
      e.preventDefault();
      return submitStartForm();
    });
=======
    $("form#get_started").submit(function(e) {
      e.preventDefault();
      return submitStartForm();
    });
    return $("registration").submit(function(e) {
      e.preventDefault();
      return submitRegistrationForm();
    });
>>>>>>> origin/master
  };

  /* -------------------------------------------- 
       Begin application.coffee 
  --------------------------------------------
  */

  jQuery(function($) {
    return initForm();
  });

}).call(this);
