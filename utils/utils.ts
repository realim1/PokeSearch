export const removeSpecialChars = (string: string) => {
	return string.replace(/[`~!@#$%^&*()_|+\=?;:'",.<>\{\}\[\]\\\/]/gi, "");
};
