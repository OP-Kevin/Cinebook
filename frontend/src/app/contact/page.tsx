"use client"

import { useState } from "react"
import BackButton from "@/Component/BackButton"
import { FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa"

export default function ContactPage() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  })

  const handleSubmit = (e:any) => {
    e.preventDefault()
    alert("Message Sent Successfully 🎉")
    setForm({
      name: "",
      email: "",
      subject: "",
      message: ""
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-950 to-black text-white px-6 py-12">

      <BackButton/>

      <div className="max-w-6xl mx-auto mt-10">

        {/* HERO */}
        <div className="text-center mb-14">
          <h1 className="text-5xl font-bold mb-4">
            Contact CineBook 📞
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Have questions about movie booking, payments or theaters?
            Our support team is here to help you anytime.
          </p>
        </div>

        {/* CONTACT INFO */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">

          <div className="bg-white/10 p-6 rounded-2xl text-center backdrop-blur">
            <div className="text-3xl mb-2">📍</div>
            <h3 className="font-semibold mb-2">Our Office</h3>
            <p className="text-gray-400 text-sm">
              VR Mall Road<br/>
              Surat, Gujarat
            </p>
          </div>

          <div className="bg-white/10 p-6 rounded-2xl text-center backdrop-blur">
            <div className="text-3xl mb-2">📧</div>
            <h3 className="font-semibold mb-2">Email</h3>
            <p className="text-gray-400 text-sm">
              support@cinebook.com<br/>
              help@cinebook.com
            </p>
          </div>

          <div className="bg-white/10 p-6 rounded-2xl text-center backdrop-blur">
            <div className="text-3xl mb-2">📞</div>
            <h3 className="font-semibold mb-2">Phone</h3>
            <p className="text-gray-400 text-sm">
              +91 98765 43210<br/>
              +91 90123 45678
            </p>
          </div>

        </div>

        {/* FORM + MAP */}
        <div className="grid md:grid-cols-2 gap-10">

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="bg-white/10 p-8 rounded-3xl backdrop-blur space-y-5"
          >

            <h2 className="text-2xl font-semibold mb-4">
              Send Message ✉️
            </h2>

            <input
              type="text"
              placeholder="Full Name"
              required
              value={form.name}
              onChange={e=>setForm({...form,name:e.target.value})}
              className="w-full p-3 rounded-lg bg-black/40 border border-white/20 outline-none"
            />

            <input
              type="email"
              placeholder="Email Address"
              required
              value={form.email}
              onChange={e=>setForm({...form,email:e.target.value})}
              className="w-full p-3 rounded-lg bg-black/40 border border-white/20 outline-none"
            />

            <input
              type="text"
              placeholder="Subject"
              required
              value={form.subject}
              onChange={e=>setForm({...form,subject:e.target.value})}
              className="w-full p-3 rounded-lg bg-black/40 border border-white/20 outline-none"
            />

            <textarea
              placeholder="Your Message"
              rows={4}
              required
              value={form.message}
              onChange={e=>setForm({...form,message:e.target.value})}
              className="w-full p-3 rounded-lg bg-black/40 border border-white/20 outline-none"
            />

            <button className="w-full bg-red-500 hover:bg-red-600 py-3 rounded-xl font-semibold">
              Send Message
            </button>

          </form>

          {/* MAP */}
          <div className="bg-white/10 rounded-3xl overflow-hidden backdrop-blur">

            <iframe
              src="https://www.google.com/maps?q=Surat&output=embed"
              className="w-full h-full min-h-[420px]"
              loading="lazy"
            ></iframe>

          </div>

        </div>

        {/* SOCIAL */}
        <div className="text-center mt-16">
  <h2 className="text-2xl font-semibold mb-4">
    Follow Us 🎥
  </h2>

  <div className="flex justify-center gap-6 text-2xl">

    <a
      href="https://instagram.com"
      target="_blank"
      className="bg-white/10 p-4 rounded-full hover:bg-red-500 transition"
    >
      <FaInstagram />
    </a>

    <a
      href="https://facebook.com"
      target="_blank"
      className="bg-white/10 p-4 rounded-full hover:bg-red-500 transition"
    >
      <FaFacebookF />
    </a>

    <a
      href="https://twitter.com"
      target="_blank"
      className="bg-white/10 p-4 rounded-full hover:bg-red-500 transition"
    >
      <FaTwitter />
    </a>

  </div>
</div>

      </div>
    </div>
  )
}