import React from 'react';
import { Link } from 'react-router-dom';
import { Paintbrush, Wrench, Zap, Hammer, Truck, Sparkles, Flower2, Wrench as HandymanTool } from 'lucide-react';

const Services = () => {
  const services = [
    {
      id: 'painting',
      title: 'Painting',
      description: 'Interior and exterior painting services',
      icon: Paintbrush,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDnO5O4OKPGVGJL7vYFH2D7cuZ_ZfWohY9z7tAnTfUmV4XvaHQ1kzYyCZqMVINRTYA0OBx5FM4x-oKPLy-AMguTg9nPi_cXCrnZgKAddBElNLnML0ip3MqqVY3T6Y6mqski9QXVU_hJAaCG9GNr_YOVPpsrqnHDcIB2yxoVyj0cmi9Br0DgmIN_Q6hEWWSGMoDCuFaKDIt1GOyr1YmNlpub2BtRaA7XLKWc-eKhEm7YY6zHdqxeOoya0EyvXjbD5UrA5V_Z1_SskJvn',
      href: '/painting'
    },
    {
      id: 'plumbing',
      title: 'Plumbing',
      description: 'Fixing leaks, installing fixtures, and more',
      icon: Wrench,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAiLMMIDij4jQ_cTnuMVsC6Or3ETtqjS9GJTOV9oe0BKF7_rIdddxh5vllb1hxYK3YxZnP_yhIOoKs3ZT4FEHtQcVcgjs1FgSxCPtauR75rOqIDx-I3-Vj_NzvDGcdiK04nN2YLsxEnVuwlc72xDXieQgsbuPROz5wVbsgqjp2tPngROUJrbDe9E_4ORzX5Fc9eEzt9F8OoyEuaEs0pMLuGya3kGAgzvY9SZfqj1jvWb9FgXHqh5Ph_vbgqZwEcz3LGPYVXmBGna_1M',
      href: '/plumbing'
    },
    {
      id: 'electrical',
      title: 'Electrical',
      description: 'Wiring, repairs, and installations',
      icon: Zap,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCq5w130yVRE6huovMrlvO6Uj8AWtm8-kD-9A_COifJ74ftslio4D7UIq9RsPG_o0XtouZ_ZZq7e1kTelu8fO7DCFQTEN0ui2BnIwRT4LmaEDH-FoYsOvyGUZmPvy1TDzVzvQIq8ef_KXwJwruWIJn0082e2mIneQ7FzE5yKayNlTwsQZrkkVR0rXXryIiIdyGPQJJ6Tc1CXx701MWRi-bXYfJxKgdu-NzZuAoZFqN1J2axFphqSK_WWgXm8WNoziU9J3f6xTjl1F43',
      href: '/electrical'
    },
    {
      id: 'carpentry',
      title: 'Carpentry',
      description: 'Furniture assembly, repairs, and custom work',
      icon: Hammer,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBeCmDsgpybrzyUMJIsCmDANacYxRNnbrYaz8Yw8m4Mj2_ZaiGap0-hbUnMeLJ1N8qbdd2UlFGn_0pf2ESISPcmq1vPg0wBLJN_KkFEKVph77e3dTEGop5QqOxHF7thr172-1aDfA5eN5MnLqNhgz2DGcAcxrFx6snqhqlhYktErEA3Cp0MVVJHZq3jXoM5XpHHlHTTSYazfi_WRAOj2g_icqCjKlC7GazqwVpLsmAbozLGXK0TKvrmJVKsq0_0i-CykRZqIhGSFeId',
      href: '/carpentry'
    },
    {
      id: 'moving',
      title: 'Moving',
      description: 'Local and long-distance moving assistance',
      icon: Truck,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDptsohxGBvatvSKMVkM1sH8JR-UeHK5Ugp2uWLew1LrQpiRJQ-BGvQIgR-76fYJcisRr9zt5NfBoRlA-_uWhXfzDyoispY2ZfqcRh_83cf5WGfTgViQRTBTf6QJRVmXUld7Ww_2vie8phklFHtnaTknIH3kinDhMmv5BDyfG1myApyAD_h9AUvYAcHx-gqgT5mzeHTb-wbrAQXtB8MFhkQ32IlqTuoYsxz98lZZY2HRggNiO6Ra094wWL5i4uM54SEzOEKE_j0aX7D',
      href: '/moving'
    },
    {
      id: 'cleaning',
      title: 'Cleaning',
      description: 'House cleaning, deep cleaning, and more',
      icon: Sparkles,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAuBcBHMRg6WJo7_lxDHi2Kf-98bPMuTg5bahgnIMtmUbGFU8HUxU0BjYV8OGbVoXdsSRtAmvRKzGnbfMSZ2hPcskf0O5tMEjZAJ4vx2v9WDLbp2LcvNgxJhNv0tYAmoXJXp3g2VAt3Efj3DnltBiH62EtastUbDu8qrA2r-vMfyyRZSTv_EQNzsrEaLjg34GNL2slMK02rEsB-l83mDSn_QElBd3gfp2Y5SpvHyji0-ytrswBgxOfxNoza-Belaeq00c88hIPlbMhv',
      href: '/cleaning'
    },
    {
      id: 'gardening',
      title: 'Gardening',
      description: 'Lawn care, landscaping, and gardening',
      icon: Flower2,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBC8RsbCri_oyUA5tXJa2tQ46NqyAtjx-Zp8O1_K5fKY_pdgr-I1Jcx2R8kBwcW41eJ1xRdloZo73Cg9ZcoivBgNePHWRiVb-PQbLj1SbGohw1wQ_TK0vHCQ8QfW4snXQ_SbUFDipegiUFzSJ3lPIY5DFnJUf1RfVrD_uRFg0QMbpFOh0H5pnfMPZ_9KZPGqx5LYqxRvcZ1Rh_QkiWLC0v8Hzqxqn-x0O4jHvxTUCwet9VRlFZ5UPPj9v3lyV0VPwjqeHgP3VmT7Icp',
      href: '/gardening'
    },
    {
      id: 'handyman',
      title: 'Handyman',
      description: 'General home repairs and maintenance',
      icon: HandymanTool,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCSlWNW_a5rqy1RzyIHiG8cFwr4PJi7NlQtCyYsLihi40aK3Kep0nF5bN5mhDyd_Kp3QhrgJ43xRDBXOMEk6saPOCqH6oBVTIG0IRir-7BzEfwnk3qs-Lqat7PICZfC9TTIzoolvx2r_pgLEQAX1k1pZSDOGmyFcm3OZBa0WfpCGP-y8uIz-JWjEdHMB3tadIeYGNZYdAETNZBy8Po5tfLCqGMeCCikh0cKfmE5RpbCP0ctL43iytk71WzoyP0fs-v-FZhu3-nVZCCf',
      href: '/handyman'
    }
  ];

  return (
    <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">Our Services</h1>
          <p className="mt-4 text-lg max-w-2xl mx-auto">Whatever you need, we've got a professional for the job. Browse our categories below.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <Link
              key={service.id}
              to={service.href}
              className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <div
                className="absolute inset-0 bg-center bg-cover transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url("${service.image}")` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
              <div className="relative flex flex-col justify-end h-72 p-6 text-white">
                <div className="flex items-center gap-3 mb-2">
                  <service.icon className="w-6 h-6" />
                  <h3 className="text-xl font-bold">{service.title}</h3>
                </div>
                <p className="text-sm mt-1 text-white/80">{service.description}</p>
              </div>
            </Link>
          ))}
        </div>
    </main>
  );
};

export default Services;
