async function get() {
	return new Promise(
		() => {
			console.log("Resovle: 1");
		},
		() => {
			console.log("Reject: 1");
		}
	);
}

async function testAsync() {
	const x = await get().then((res) => console.log(res));
	console.log(x);
}

testAsync();
