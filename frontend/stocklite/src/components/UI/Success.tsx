import { CheckCircle2 } from "lucide-react";

type successProps = {
    action: string
}

function Success ({action}: successProps) {

    return (

        <div className="flex flex-col items-center justify-center p-10 bg-indigo-50 border border-indigo-100 rounded-2xl max-w-lg mx-auto text-center gap-4">
            <CheckCircle2 className="w-18 h-18 text-indigo-600 animate-bounce" />
            <h1 className="text-3xl font-bold text-indigo-800">Succès !</h1>
            <p className="text-indigo-700">{action} avec succès. Redirection en cours...</p>
        </div>

    )

}
export default Success;


