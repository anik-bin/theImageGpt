"use client";
import { Button } from "./ui/button";
import { Dialog, DialogTitle, DialogContent, DialogHeader, DialogDescription, DialogFooter } from "./ui/dialog";
import { useProText } from "@/hooks/pro-text";

export const ProText = ()=>{

    const proText = useProText();
    return (
        <Dialog open={proText.isOpen} onOpenChange={proText.onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2 text-lg font-bold">You have exhausted your free credits</DialogTitle>
                    <DialogDescription className="flex justify-center items-center text-md">Buy more credits to continue generating images</DialogDescription>
                </DialogHeader>
                <DialogFooter><Button className="w-full">Buy Credits</Button></DialogFooter>
            </DialogContent>

        </Dialog>
    )
}