import {
  useMutation,
  useQuery,
} from '@tanstack/react-query'
import { ArrowLeft, Trash } from 'lucide-react'
import {
  Link,
  useNavigate,
  useParams,
} from 'react-router-dom'
import type { Customer } from '~/src/shared/types/ipc'
import { queryClient } from '../lib/react-query'

export default function Detail() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()

  const { data, isFetching } = useQuery<Customer>({
    queryKey: ['customer'],
    queryFn: async () => {
      if (!id) {
        throw new Error('ID is undefined')
      }

      const response =
        await window.api.fetchCustomerById(id)

      return response
    },
  })

  const { isPending, mutateAsync: handleDeleteCustomer } =
    useMutation({
      mutationFn: async (id: string) => {
        try {
          const response =
            await window.api.deleteCustomer(id)
        } catch (err) {
          console.error('OCORREU UM ERRO AO DELETAR', err)
        }
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['customers'],
        })
        navigate('/')
      },
    })

  return (
    <main className="flex-1 flex flex-col py-12 px-10 text-white">
      <Link to="/" className="flex items-center gap-2 mb-2">
        <ArrowLeft className="size-6 text-white" />
        <span>Voltar</span>
      </Link>
      <h1 className="text-white text-xl lg:text-3xl font-semibold mb-4">
        Detalhes do Cliente
      </h1>
      <section className="flex flex-col gap-6 w-full">
        {!isFetching && data && (
          <article className="w-full">
            <section className="bg-gray-800 px-4 py-4 rounded mb-4">
              <div className="flex items-center">
                <p className="mb-2 text-lg font-bold flex-1">
                  {data.name}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    handleDeleteCustomer(data._id)
                  }}
                  className="size-7 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center"
                >
                  <Trash className="size-4" />
                </button>
              </div>
              <p className="mb-2 text-lg">
                <span className="font-bold">Email: </span>
                {data.email}
              </p>
              <p className="mb-2 text-lg">
                <span className="font-bold">
                  Telefone:{' '}
                </span>
                {data.phone}
              </p>
              <p className="text-lg">
                <span className="font-bold">
                  Endereço:{' '}
                </span>
                {data.address}
              </p>
            </section>
            <section className="bg-gray-800 px-4 py-4 rounded">
              <p className="mb-2 text-lg">
                <span className="font-bold">Cargo: </span>
                {data.role}
              </p>
              <p className="text-lg">
                <span className="font-bold">Status: </span>
                {data.status ? 'ATIVO' : 'INATIVO'}
              </p>
            </section>
          </article>
        )}
      </section>
    </main>
  )
}
