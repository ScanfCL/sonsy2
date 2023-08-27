import Link from 'next/link';
import { getVariants } from './actions';
import { FaPlus } from 'react-icons/fa';

export default async function Variants() {
  const variants = await getVariants();

  return (
    <div className="max-w-screen-lg w-full mx-auto py-6 px-4">
      <div className="text-3xl text-center mb-4">Variants Management</div>
      <div className="flex justify-between">
        <div className="card bg-secondary px-4 mb-4 h-fit">
          <div className="text-sm breadcrumbs font-bold text-white">
            <ul>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/management">Management</Link>
              </li>
              <li>
                <Link href="/variants">Variants</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex justify-end mb-4">
          <Link href="/variants/create">
            <button
              className="btn btn-neutral"
              // onClick={() => window.my_modal_2.showModal()}
            >
              <FaPlus /> CREATE
            </button>
          </Link>
        </div>
      </div>
      <div className="card shadow-md overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>ProductVariantTypeId</th>
            </tr>
          </thead>
          <tbody>
            {variants?.map((variant, index) => (
              <tr key={variant.id}>
                <td>{index + 1}</td>
                <td>{variant.name}</td>
                <td>{variant.productVariantTypeId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
