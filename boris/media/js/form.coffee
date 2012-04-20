### Form Logic ###

$.fn.serializeJSON = ->
	json = {}
	$.map($(@).serializeArray(), (n, i) ->
			if n.value == "on"
				n.value = 1
			else if n.value == "off"
				n.value = 0
			json[n.name] = n.value
		)
	json

submitStartForm = ->

	requiredFields =
		firstName:
			id: "#first_name"
			msg: "First name is required"
			validate: -> validateName($(@.id))
		lastName:
			id: "#last_name"
			msg: "Last name is required"
			validate: -> validateName($(@.id))
		email:
			id: "#email_address"
			msg: "Please enter a valid email address"
			validate: -> validateEmail($(@.id))
		zip:
			id: "#zip_code"
			msg: "Please enter a 5 digit zip code"
			validate: -> validateZip($(@.id))

	errors = []

	for field in requiredFields
		if field.validate
			continue
		else
			errors.push({id: field.id, msg: field.msg})

	# Return if there is an error
	if errors.length < 0
		# Handle Validation Errors
		for i in errors
			$(errors[i].id)
				.addClass('error')
				.prepend("<span class='error-message'>#{errors[i].msg}</span>")
		return false
	else
		getCityState($("#pre_zip_code").val())

submitRegistrationForm = ->
	# validate registration form inputs
	requiredFields = {
		title:
			id: "#name_title"
			msg: "Title is required"
			validate: -> validateTitle($(@.id))
		firstName:
			id: "#first_name"
			msg: "First name is required"
			validate: -> validateName($(@.id))
		lastName:
			id: "#last_name"
			msg: "Last name is required"
			validate: -> validateName($(@.id))
		nameChange:
			id: "#change_of_name"
			msg: "Please enter your previous name"
			validate: -> validateChangedName($(@.id))
		idNumber:
			id: "#id_number"
			msg: "Please enter a valid id number"
			validate: -> validateIDNumber($(@.id))
		birthday:
			id: "#date_of_birth"
			msg: "Please enter a valid date in a MM/DD/YYYY format, you must be 18 years old to register."
			validate: -> validateBirthday($(@.id))
		email:
			id: "#email_address"
			msg: "Please enter a valid email address"
			validate: -> validateEmail($(@.id))
		phone:
			id: "#phone"
			msg: "Please enter a valid phone number"
			validate: -> validatePhoneNumber($(@.id))
		address:
			id: "#home_address"
			msg: "Address is required"
			validate: -> validateAddress($(@.id))
		city:
			id: "#home_city"
			msg: "City is required"
			validate: -> validateCity($(@.id))
		state:
			id: "#home_state_id"
			msg: "State is required"
			validate: -> validateState($(@.id))
		zip:
			id: "#zip_code"
			msg: "Please enter a 5 digit zip code"
			validate: -> validateZip($(@.id))
		mailingAddress:
			id: "#has_different_address"
			msg: "Please enter your mailing address information"
			validate: -> validateMailingAddress($(@.id))
		prevAddress:
			id: "#change_of_address"
			msg: "Please enter your previous address information"
			validate: -> validateRecentlyMoved($(@.id))
	}

	errors = []

	for field in requiredFields
		if field.validate
			continue
		else
			errors.push({id: field.id, msg: field.msg})

	# Return if there is an error
	if errors.length < 0
		# Handle Validation Errors
		for i in errors
			$(errors[i].id)
				.addClass('error')
				.prepend("<span class='error-message'>#{errors[i].msg}</span>")
		return false
	else
		# Post registration
		data = $(@).serializeJSON()
		data.partner_id = '1'
		data.home_state_id = '1'

		requiredBools = [
			'opt_in_email'
			'opt_in_sms'
			'us_citizen'
		]

		for i in requiredBools
			if !data[requiredBools[i]]
				data[requiredBools[i]] = 0

		console.log 'Ready to Send:'
		console.log data

		$.ajax({
			type: "POST"
			url: "/api/v1/registrations.json"
			data: {'registration':data}
			cache: false
			error: (response) -> #handle error
				console.log response
			success: (response) -> #handle success
				console.log response
			complete: (response) -> #handle complete
				console.log response
		})

initForm = ->
	# Setup Hidden Elements
	$("#registration_form").hide()	
	$(".mailing").hide()
	$(".name-change").hide()
	$(".address-change").hide()

	# Setup Form Submit Events
	$("form#get_started").submit(
		(e) ->
			e.preventDefault()
			submitStartForm()
		)
	$("registration").submit(
		(e) ->
			e.preventDefault()
			submitRegistrationForm()
		)

	# TODO: Setup Onchange Validation Logic
