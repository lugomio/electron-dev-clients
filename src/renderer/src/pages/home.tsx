import {
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { Link } from 'react-router-dom'

export default function Home() {
  const queryClient = useQueryClient()
  const { data } = useQuery({
    queryKey: ['customers'],
    queryFn: async () => {
      const result = await window.api.fetchAllCostumers()
      return result
    },
  })

  return (
    <div className="flex-1 flex flex-col py-12 text-white">
      <div className="px-10">
        <h1 className="text-white text-xl lg:text-3xl font-semibold mb-4">
          Todos os Clientes
        </h1>
      </div>
      <section className="flex flex-col gap-6 w-full h-screen overflow-y-auto px-10 pb-52">
        {data?.map(customer => {
          return (
            <Link
              to={`/customer/${customer._id}`}
              key={customer._id}
              className="bg-gray-800 px-4 py-4 rounded"
            >
              <p className="mb-2 font-semibold text-lg">
                {customer.name}
              </p>
              <p className="mb-2 text-lg">
                <span className="font-semibold">
                  E-mail:{' '}
                </span>
                {customer.email}
              </p>
              {customer.phone && (
                <p className="mb-2 text-lg">
                  <span className="font-semibold">
                    Telefone:{' '}
                  </span>
                  {customer.phone}
                </p>
              )}
            </Link>
          )
        })}
      </section>
    </div>
  )
}
