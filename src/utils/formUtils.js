
export const verifyErrorField = (field, message) => message.split(' ').filter(v => v === field).length

export function validateForm(){
	const regex = /^\s*$/
	const fields = []
	const emptyErrors = []

	const setFields = (arr) => fields.push(...arr)

	function showError(){
		emptyErrors.forEach(err => {
			const field = fields.find(field => field.input.name == err)
			field.warning.value = `Campo "${field.input.name} não pode ser vazio."`
			field.input.parentElement.classList.add('invalid-input')
		})
	}

	function isEmpty(){
		fields.forEach(field => {
			if(regex.test(field.input.value)){
				if(!emptyErrors.find(err => field.input.name == err)){
					emptyErrors.push(field.input.name)
				}
			}else{
				const errorIndex = emptyErrors.findIndex(err => field.input.name === err)
				if(errorIndex != -1) emptyErrors.splice(errorIndex, 1)
			}
		})
		return emptyErrors.length
	}

	function removeErrors(){
		emptyErrors.forEach(err => {
			const field = fields.find(field => field.input.name == err)
			field.warning.value = ''
			field.input.parentElement.classList.remove('invalid-input')
		})
	}

	return {
		removeErrors,
		emptyErrors,
		setFields,
		showError,
		isEmpty
	}
}