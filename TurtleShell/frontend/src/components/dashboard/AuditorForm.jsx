import { Formik, Field, Form, ErrorMessage } from "formik"
import * as Yup from "yup"
import { BsArrowRightShort } from "react-icons/bs"
import "./Dashboard.css"
import { useState } from "react"

const AuditorForm = ({ onSubmit, updateContractType }) => {
	// accept the onSubmit prop
	const [contractType, setContractType] = useState("")

	return (
		<div className="bg-box">
			<div>
				<h1 className="h1">Auditor Form</h1>
				<h2 className="h2">Type of Contract</h2>
			</div>
			<div className="submit">
				<Formik
					initialValues={{ contractType: "" }}
					validationSchema={Yup.object({
						color: Yup.string().required("Required"),
					})}
				>
					<Form
						onChange={(e) => {
							// get the value from the event
							updateContractType(e.target.value)
							setContractType(e.target.value)
						}}
					>
						<label htmlFor="color"></label>
						<Field as="select" name="color">
							<option value="#">Select</option>
							<option value="good-erc20">Standard ERC-20</option>
							<option value="bad-erc20">Malicious ERC-20</option>
							<option value="flash-loan">Flash Loan</option>
							<option value="erc-1155">ERC-1155</option>
							<option value="erc-721">ERC-721</option>
						</Field>

						<ErrorMessage name="color" component="div" />
					</Form>
				</Formik>
			</div>

			<div>
				<button
					className="submit-button"
					onClick={() => onSubmit()}
				>
					<div className="flex items-center">
						Submit
						<BsArrowRightShort size={20} />
					</div>
				</button>
			</div>
		</div>
	)
}

export default AuditorForm


// className={`px-4 py-2 mb-3 text-sm font-semibold bg-gradient-to-br from-[#5C2C69] to-#2C4C84 border-transparent rounded-full w-fit text-[#C2C2C2]`}