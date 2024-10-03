import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import { useRef, type FormEvent } from 'react'
import type { NewCustomer } from '~/src/shared/types/ipc'

interface DataMutation {
  name: string
  email: string
  phone: string
  role: string
  address: string
}

export default function Create() {
  const queryClient = useQueryClient()

  const nameRef = useRef<HTMLInputElement | null>(null)
  const emailRef = useRef<HTMLInputElement | null>(null)
  const addressRef = useRef<HTMLInputElement | null>(null)
  const phoneRef = useRef<HTMLInputElement | null>(null)
  const roleRef = useRef<HTMLInputElement | null>(null)

  const { isPending, mutateAsync: createCustomer } =
    useMutation({
      mutationFn: async (data: DataMutation) => {
        const doc: NewCustomer = {
          name: data.name,
          email: data.email,
          address: data.address,
          phone: data.phone,
          role: data.role,
          status: true,
        }

        await window.api
          .addCustomer(doc)
          .then(response => {
            console.log('cadastrou')
          })
          .catch(err => {
            console.error('Deu erro e nao cadastrou', err)
          })
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['customers'],
        })
      },
    })

  async function handleAddCustomer(e: FormEvent) {
    e.preventDefault()

    const name = nameRef.current?.value
    const email = emailRef.current?.value
    const address = addressRef.current?.value
    const phone = phoneRef.current?.value
    const role = roleRef.current?.value

    if (!name || !address || !email || !phone || !role)
      return

    await createCustomer({
      name,
      email,
      phone,
      address,
      role,
    })
  }

  return (
    <div className="flex-1 flex flex-col py-12 px-10 gap-8 overflow-y-auto">
      <section className="flex flex-1 flex-col items-center">
        <h1 className="text-white font-semibold text-xl lg:text-3xl">
          Cadastrar Novo Cliente
        </h1>

        <form
          className="w-full max-w-96 mt-4"
          onSubmit={handleAddCustomer}
        >
          <div className="mb-2">
            <label htmlFor="name" className="text-lg">
              Nome:
            </label>
            <input
              id="name"
              type="text"
              placeholder="Digite o nome do cliente..."
              className="w-full h-9 rounded text-black px-2"
              ref={nameRef}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="address" className="text-lg">
              Endereço:
            </label>
            <input
              id="address"
              type="text"
              placeholder="Digite o endereço do cliente..."
              className="w-full h-9 rounded text-black px-2"
              ref={addressRef}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="email" className="text-lg">
              E-mail:
            </label>
            <input
              id="email"
              type="email"
              placeholder="Digite o e-mail do cliente..."
              className="w-full h-9 rounded text-black px-2"
              ref={emailRef}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="role" className="text-lg">
              Cargo:
            </label>
            <input
              id="role"
              type="text"
              placeholder="Digite o cargo do cliente..."
              className="w-full h-9 rounded text-black px-2"
              ref={roleRef}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="text-lg">
              Telefone:
            </label>
            <input
              id="phone"
              type="text"
              placeholder="Digite o telefone do cliente..."
              className="w-full h-9 rounded text-black px-2"
              ref={phoneRef}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 rounded flex items-center justify-center w-full h-9"
          >
            Cadastrar
          </button>
        </form>
      </section>
    </div>
  )
}
