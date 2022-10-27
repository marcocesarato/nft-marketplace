import {ToastPosition, useToast as useChackraToast, UseToastOptions} from "@chakra-ui/react";
import {useTranslation} from "next-i18next";

export default function useToast() {
	const toast = useChackraToast();
	const {t} = useTranslation();
	const defaultOptions = {duration: 10000, position: "top" as ToastPosition, isClosable: true};
	return {
		successToast: (options: UseToastOptions) => {
			toast({...defaultOptions, ...options, status: "success"});
		},
		infoToast: (options: UseToastOptions) => {
			toast({...defaultOptions, ...options, status: "info"});
		},
		warnToast: (options: UseToastOptions) => {
			toast({...defaultOptions, ...options, status: "warning"});
		},
		errorToast: (options: UseToastOptions) => {
			toast({
				...defaultOptions,
				title: t<string>("errror:title"),
				...options,
				status: "error",
			});
		},
	};
}
