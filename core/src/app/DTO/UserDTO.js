class UserDTO {
	constructor(user) {
		this.id = user._id;
		this.username = user.username;
		this.email = user.email;
		this.phone = user.phone;
		this.avatar = user.avatar;
	}
}

export default UserDTO;
