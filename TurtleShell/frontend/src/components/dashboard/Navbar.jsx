import { FiHome } from "react-icons/fi"
import { BiCookie} from "react-icons/bi"
import { IoExit } from "react-icons/io5"
import { Link } from "react-router-dom"
import WhiteLogo from "../../assets/Logo_new.svg"
import { ConnectButton } from "@rainbow-me/rainbowkit"

export default function NavBar() {
	return (
		<>
		<div className="fixed top-0 right-0 p-4 text-white">
			<ConnectButton/>
		</div>
		<div className="fixed w-[10rem] h-screen flex items-center">
			<div className="h-[95%] w-[8rem] mx-auto bg-bar-bg rounded-30 flex items-center">
				<div className="flex flex-col justify-between h-[95%] w-[50%] mx-auto">
					<div className="w-[80%] flex mx-auto">
						<img src={WhiteLogo} alt="Turtleshell" height={60} width={60} />
					</div>
					<div className="flex flex-col items-center justify-center gap-20">
						<Link
							to="/dashboard"
							className="flex mx-auto w-full flex-col gap-2 items-center justify-center"
						>
							<FiHome className="text-secondary-grey" size="34" />
							<span className="text-secondary-grey font-semibold text-[16px]">Home</span>
						</Link>
						<Link
							to="/cookie3"
							className="flex mx-auto w-full flex-col gap-2 items-center justify-center"
						>
							<BiCookie className="text-secondary-grey" size="36" />
							<span className="text-secondary-grey font-semibold text-center text-[16px]">
								cookie3
							</span>
						</Link>
						{/* for more spacing */}
						<div></div>
					</div>
					<div className="flex justify-center">
						<Link
							to="/"
							className="flex mx-auto w-full flex-col gap-2 items-center justify-center"
						>
							<IoExit className="text-secondary-grey" size="34" />
							<span className="text-secondary-grey font-semibold text-[16px]">Exit</span>
						</Link>
					</div>
				</div>
			</div>
		</div>
		</>
	)
}