"use client";
import React, { useState } from 'react';

export default function SistemaViajantes() {
  // Lógica de Precios y Comisiones
  const [precioLista, setPrecioLista] = useState(0);
  const [descCliente, setDescCliente] = useState(0);
  const [comisionEmpresa, setComisionEmpresa] = useState(0);
  
  // Datos de Conciliación (El "Matcheo")
  const [nroFactura, setNroFactura] = useState("");
  const [tipoFactura, setTipoFactura] = useState("Factura A");

  // Cálculos (Estimando un 25% de carga impositiva para limpiar la factura)
  const totalConDescuento = precioLista * (1 - descCliente / 100);
  const netoSinImpuestos = totalConDescuento / 1.25;
  const gananciaViajante = netoSinImpuestos * (comisionEmpresa / 100);

  return (
    <div className="min-h-screen bg-zinc-100 p-4 sm:p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-zinc-900">Gestión de Ventas y Comisiones</h1>
          <p className="text-zinc-600">Calculá tu ganancia neta y conciliá con la factura de la empresa.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Bloque 1: Datos de la Operación */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-200 space-y-4">
            <h2 className="text-lg font-semibold text-blue-600">1. Presupuesto</h2>
            <div>
              <label className="block text-sm font-medium text-zinc-700">Precio Lista Total (USD)</label>
              <input 
                type="number" 
                className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="0.00"
                onChange={(e) => setPrecioLista(Number(e.target.value))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700">% Descuento a Cliente</label>
              <input 
                type="number" 
                className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Ej: 20"
                onChange={(e) => setDescCliente(Number(e.target.value))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700">% Tu Comisión</label>
              <input 
                type="number" 
                className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Ej: 5"
                onChange={(e) => setComisionEmpresa(Number(e.target.value))}
              />
            </div>
          </div>

          {/* Bloque 2: Resultados en Tiempo Real */}
          <div className="bg-zinc-900 text-white p-6 rounded-2xl shadow-xl flex flex-col justify-between">
            <div>
              <span className="text-zinc-400 text-sm uppercase tracking-widest">Venta Final</span>
              <p className="text-4xl font-mono font-bold">${totalConDescuento.toLocaleString()}</p>
            </div>
            <div className="bg-zinc-800 p-4 rounded-xl mt-4">
              <span className="text-green-400 text-sm font-bold uppercase">Tu Ganancia Neta</span>
              <p className="text-3xl font-mono font-bold text-green-400">
                ${gananciaViajante.toLocaleString(undefined, {minimumFractionDigits: 2})}
              </p>
              <p className="text-[10px] text-zinc-500 mt-2 italic">* Calculado sobre base neta (sin IVA/IIBB estimulados)</p>
            </div>
          </div>

          {/* Bloque 3: Conciliación (El Matcheo de factura) */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border-2 border-orange-200 md:col-span-2">
            <h2 className="text-lg font-semibold text-orange-600 mb-4">2. Conciliación con Factura de Empresa</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-zinc-700">Tipo de Comprobante</label>
                <select 
                  className="w-full mt-1 p-2 border rounded-lg"
                  value={tipoFactura}
                  onChange={(e) => setTipoFactura(e.target.value)}
                >
                  <option>Factura A</option>
                  <option>Factura B</option>
                  <option>Factura C</option>
                  <option>Liquidación</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700">Número de Factura</label>
                <input 
                  type="text" 
                  className="w-full mt-1 p-2 border rounded-lg"
                  placeholder="0001-00001234"
                  value={nroFactura}
                  onChange={(e) => setNroFactura(e.target.value)}
                />
              </div>
              <div className="flex items-end">
                <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                  Vincular Factura
                </button>
              </div>
            </div>
            {nroFactura && (
              <div className="mt-4 p-2 bg-orange-50 rounded text-sm text-orange-800 italic">
                Vinculando presupuesto a: <strong>{tipoFactura} {nroFactura}</strong>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}