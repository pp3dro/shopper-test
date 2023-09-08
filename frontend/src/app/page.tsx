"use client";
import { Alert } from '@/components/Alert';
import { Button } from '@/components/Button';
import { FileInput } from '@/components/FileInput';
import { RowProps, Table } from '@/components/Table';
import pricesResource, { ProductError, ValidatedData } from '@/config/plugins/http/product/prices-resolver';
import { useEffect, useState } from 'react'


const listErrors = (errors: ProductError[]) => {
  return (
    <div className='flex flex-row'>
      {errors.map((error: ProductError, index: number) => (
        <div key={index}>
          <span className='font-bold'>{error.type}: </span>
          <span>{error.message}</span>
        </div>
      ))}
    </div>
  )
}

export default function Home() {

  const [isValid, setIsValid] = useState(false)
  const [validatedData, setValidatedData] = useState<ValidatedData[]>([])
  const [file, setFile] = useState<File | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [sending, setSending] = useState(false)

  useEffect(() => {
    setValidatedData([])
    setIsValid(false)
  }, [file])

  const validateFile = async () => {
    if (!file || sending) {
      return
    }
    setError(null)
    setValidatedData([])
    setIsValid(false)
    setSending(true)

    pricesResource.validate({sheet: file})
    .then(response => {
      if (response.data.status === 'error' || !response.data.data) {
        setError(response.data.message)
        setSending(false)
        return
      }
      setIsValid(response.data.data.isValid)
      setValidatedData(response.data.data.products)
      setSending(false)
    })
    .catch(error => {
      setError(error.response?.data?.message ?? 'Não foi possível concluir a requisição, atualize a página e tente novamente.')
      setSending(false)
    })
  }

  const updatePrices = async () => {
    if (!file || !isValid ||sending) {
      return
    }
    setError(null)
    setValidatedData([])
    setIsValid(false)
    setSending(true)

    pricesResource.update({sheet: file})
    .then(response => {
      if (response.data.status === 'error') {
        setError(response.data.message)
        setSending(false)
        return
      }
      if (response.data.status === 'success') {
        setSuccess(response.data.message)
        setSending(false)
        setValidatedData([])
        setFile(null)
        return
      }
      setError('Não foi possível concluir a requisição, atualize a página e tente novamente.')
      setSending(false)
    })
    .catch(error => {
      console.log(error.response)
      if(error.response?.data?.status == "error" && error.response?.data?.data?.products.length > 0) {
        setIsValid(error.response?.data?.data?.isValid)
        setError(error.response?.data?.message)
        setValidatedData(error.response?.data?.data?.products)
        setSending(false)
        return;
      }
      setError(error.response?.data?.message ?? 'Não foi possível concluir a requisição, atualize a página e tente novamente.')
      setSending(false)
    })
  }

  const tableColumns: RowProps = {
    data: ["Código", "Nome", "Preço", "Novo Preço", "Observações"]
  };

  const tableData: RowProps[] = validatedData.map<RowProps>(data => ({
    className: data.errors.length > 0 ? "bg-red-100" : "bg-green-100",
    data: [data.code, data.name, `R$ ${data.price.toFixed(2)}`, `R$ ${data.newPrice.toFixed(2)}`, listErrors(data.errors)]
  }))

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <h1 className="text-2xl font-bold">Atualizar preço dos produtos</h1>
        <form className="flex flex-col items-center justify-center w-full p-12 flex-grow" onSubmit={updatePrices}>
          <div className="flex flex-col items-center justify-center w-full">

            <Alert message={error} type="error" close={() => setError(null)} />
            <Alert message={success} type="success" close={() => setSuccess(null)} />
            
            <div className="flex items-center justify-center w-full mb-5">
                <FileInput file={file} setFile={setFile} />
            </div> 

            <div className="flex flex-row items-center justify-center w-full space-x-8">
              <Button onClick={validateFile} disabled={!file || sending}>VALIDAR</Button>
              <Button onClick={updatePrices} disabled={!file || !isValid || sending}>ATUALIZAR</Button>
            </div>
          </div>
        </form>
        {validatedData.length > 0 && <Table headers={tableColumns} rows={tableData}></Table>}
    </main>
  )
}
