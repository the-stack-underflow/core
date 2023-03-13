export function error(errors: string[]) {
	return new Response(JSON.stringify({
		success: false,
		errors
	}))
}

export function success(data: any = {}) {
	return new Response(JSON.stringify({
		success: true,
		data
	}))
}