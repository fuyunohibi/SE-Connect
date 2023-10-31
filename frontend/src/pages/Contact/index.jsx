import React from "react";

const Contact = () => {
  return (
    <section className="flex flex-1 flex-col h-auto px-7 py-5 space-y-6">
      {/* Embed Map */}
      <div className="mb-6 rounded-lg overflow-hidden shadow">
        <iframe
          title="KMITL Map"
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7751.7032982791625!2d100.772453!3d13.72743!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x311d664bb802c079%3A0x947a912a091b0339!2z4LiE4LiT4Liw4Lin4Li04Lio4Lin4LiB4Lij4Lij4Lih4Lio4Liy4Liq4LiV4Lij4LmMIOC4quC4luC4suC4muC4seC4meC5gOC4l-C4hOC5guC4meC5guC4peC4ouC4teC4nuC4o-C4sOC4iOC4reC4oeC5gOC4geC4peC5ieC4suC5gOC4iOC5ieC4suC4hOC4uOC4k-C4l-C4q-C4suC4o-C4peC4suC4lOC4geC4o-C4sOC4muC4seC4hw!5e0!3m2!1sth!2sth!4v1697289720415!5m2!1sth!2sth"
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen=""
          aria-hidden="false"
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

      {/* Contact Info */}
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <div className="text-xl font-semibold">คณะวิศวกรรมศาสตร์</div>
      <div className="text-lg mb-4">
        King Mongkut's Institute of Technology Ladkrabang
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h2 className="font-medium text-lg mb-2">Phone Numbers:</h2>
          <ul className="list-disc pl-5">
            <li>02329-8000</li>
            <li>02-329-8321</li>
          </ul>
        </div>
        <div>
          <h2 className="font-medium text-lg mb-2">Email Addresses:</h2>
          <ul className="list-disc pl-5">
            <li>telecom@kmitl.ac.th</li>
            <li>elec.kmitl.info@gmail.com</li>
            <li>maneerut.su@kmitl.ac.th</li>
            <li>siie@kmitl.ac.th</li>
            <li>sompob.po@kmitl.ac.th</li>
            <li>taweepol.su@kmitl.ac.th</li>
            <li>pholchai.ch@kmitl.ac.th</li>
            <li>ravipat.la@kmitl.ac.th</li>
            <li>wiboon.pr@kmitl.ac.th</li>
          </ul>
        </div>
      </div>

      <div className="mt-4">
        <h2 className="font-medium text-lg mb-2">Website:</h2>
        <a
          href="https://engineer.kmitl.ac.th/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          https://engineer.kmitl.ac.th/
        </a>
      </div>
    </section>
  );
};

export default Contact;
