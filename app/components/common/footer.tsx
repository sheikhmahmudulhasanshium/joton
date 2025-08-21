// app/components/common/footer.tsx

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { footerLinks, contactInfo } from '@/lib/menu';
import { Facebook, Twitter, Linkedin, Instagram, Phone } from 'lucide-react';

const Footer = () => {
    return ( 
        <footer className="bg-gray-900 text-gray-300">
            <div className="container mx-auto px-6 py-12">
                <div className="flex flex-col lg:flex-row justify-between gap-12">
                    <div className="w-full lg:w-1/3">
                        <Link href="/" aria-label="JOTON Home">
                            <Image 
                                src="/svg/full-lockup-with-tagline.svg" 
                                alt="JOTON Logo with Tagline" 
                                width={220}
                                height={60}
                                className="w-48 h-auto text-white"
                            />
                        </Link>
                        {/* --- CHANGE: Updated description to be more inclusive --- */}
                        <p className="mt-4 text-gray-400 max-w-sm">
                            The complete digital backbone for modern healthcare providers, designed to streamline operations and elevate the standard of patient care.
                        </p>
                    </div>

                    <div className="w-full lg:w-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
                        <div>
                            <h3 className="font-semibold text-white tracking-wider uppercase">Features</h3>
                            <ul className="mt-4 space-y-2">
                                {footerLinks.features.map(link => ( <li key={link.title}><Link href={link.href} className="hover:text-white transition-colors">{link.title}</Link></li> ))}
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold text-white tracking-wider uppercase">Company</h3>
                            <ul className="mt-4 space-y-2">
                                {footerLinks.company.map(link => ( <li key={link.title}><Link href={link.href} className="hover:text-white transition-colors">{link.title}</Link></li> ))}
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold text-white tracking-wider uppercase">Legal</h3>
                            <ul className="mt-4 space-y-2">
                                {footerLinks.legal.map(link => ( <li key={link.title}><Link href={link.href} className="hover:text-white transition-colors">{link.title}</Link></li> ))}
                            </ul>
                        </div>
                        <div>
                             <h3 className="font-semibold text-white tracking-wider uppercase">Contact Us</h3>
                             <ul className="mt-4 space-y-3">
                                <li className="flex flex-col">
                                    <span className="font-bold text-sm text-red-400">EMERGENCY</span>
                                    <a href={contactInfo.emergency.href} className="text-lg hover:text-white">{contactInfo.emergency.display}</a>
                                </li>
                                <li className="flex flex-col">
                                    <span className="font-bold text-sm text-cyan-400">AMBULANCE</span>
                                    <a href={contactInfo.ambulance.href} className="text-lg hover:text-white">{contactInfo.ambulance.display}</a>
                                </li>
                                 <li className="flex flex-col">
                                    <span className="font-bold text-sm text-blue-400">APPOINTMENTS</span>
                                    <a href={contactInfo.appointments.href} className="text-lg hover:text-white">{contactInfo.appointments.display}</a>
                                </li>
                             </ul>
                        </div>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-gray-700 flex flex-col sm:flex-row justify-between items-center">
                    <p className="text-gray-400 text-sm"> &copy; {new Date().getFullYear()} JOTON. All Rights Reserved. </p>
                    <div className="flex space-x-4 mt-4 sm:mt-0">
                        <Link href="#" className="text-gray-400 hover:text-white"><span className="sr-only">Facebook</span><Facebook size={20} /></Link>
                        <Link href="#" className="text-gray-400 hover:text-white"><span className="sr-only">Twitter</span><Twitter size={20} /></Link>
                        <Link href="#" className="text-gray-400 hover:text-white"><span className="sr-only">LinkedIn</span><Linkedin size={20} /></Link>
                        <Link href="#" className="text-gray-400 hover:text-white"><span className="sr-only">Instagram</span><Instagram size={20} /></Link>
                    </div>
                </div>
            </div>
        </footer>
     );
}
 
export default Footer;