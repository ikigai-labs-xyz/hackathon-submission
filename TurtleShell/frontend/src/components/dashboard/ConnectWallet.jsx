import { ConnectButton } from "@rainbow-me/rainbowkit"

export default function ConnectWallet() {
	return (
		<div className="flex flex-col justify-center mt-[-4rem] mx-auto h-screen gap-[5rem] w-auto">
			<div>
				<h1 className="text-heading-grey font-extrabold text-7xl tracking-wide">
					Let&apos;s get it started.
				</h1>
			</div>
			<div className="mx-auto">
				<ConnectButton />
			</div>
		</div>
	)
}
