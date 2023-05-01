import { Message } from "@/lib/validators/message";
import { nanoid } from "nanoid";
import { createContext, useState } from "react";

export const MessagesContext = createContext<{
    messages: Message[]
    isMessageUpdating: boolean
    addMessage: (message: Message) => void
    removeMessage: (id: string) => void
    updateMessage: (id: string, updateFn: (prevText: string) => string) => void
    setIsMessageUpdating: (isUpdating: boolean) => void
}>({
    messages: [],
    isMessageUpdating: false,
    addMessage: () => { },
    removeMessage: () => { },
    updateMessage: () => { },
    setIsMessageUpdating: () => { }
})

export function MessagesProvider({ children }: { children: React.ReactNode }) {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: nanoid(),
            text: "Hello, how can i help you?",
            isUserMessage: false
        }
    ])
    const [isMessageUpdating, setIsMessageUpdating] = useState<boolean>(false)

    const addMessage = (message: Message) => {
        setMessages((prev) => [...prev, message])
    }

    const removeMessage = (id: string) => {
        setMessages((prev) => prev.filter((item) => item.id !== id))
    }

    const updateMessage = (id: string, updateFn: (prevText: string) => string) => {
        setMessages((prev) => prev.map((message) => {
            if(message.id === id) {
                return {...message, text: updateFn(message.text)}
            }

            return message
        }))
    }
    return <MessagesContext.Provider value={{
        messages, addMessage, removeMessage, updateMessage,
        setIsMessageUpdating, isMessageUpdating
    }}>
        {children}
    </MessagesContext.Provider>
}