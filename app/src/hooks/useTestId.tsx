const useTestId = (id: string) => {
	if (process.env.NODE_ENV !== "test" && !window?.["Cypress"]) return {};
	return {
		"data-testid": id,
	};
};
export default useTestId;
