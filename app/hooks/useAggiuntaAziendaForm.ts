import { useEffect, useState } from "react";
import { fetchSymbols, Symbol } from "../api/GET/Symbols";
import { Azienda } from "../types/Azienda";

export function useAggiuntaAziendaForm(visible: boolean) {
  const [nome, setNome] = useState('');
  const [ticker, setTicker] = useState('');
  const [settore, setSettore] = useState('');
  const [azioniPossedute, setAzioniPossedute] = useState('');
  const [isProfitable, setIsProfitable] = useState(true);
  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});
  const [validSymbols, setValidSymbols] = useState<Symbol[]>([]);
  const [loadingSymbols, setLoadingSymbols] = useState(false);
  const [suggestions, setSuggestions] = useState<Symbol[]>([]);

  useEffect(() => {
    if (visible) {
      setLoadingSymbols(true);
      fetchSymbols()
        .then((symbols: Symbol[]) => setValidSymbols(symbols))
        .finally(() => setLoadingSymbols(false));
    }
  }, [visible]);

  useEffect(() => {
    if (ticker.length > 0 && validSymbols.length > 0) {
      const filtered = validSymbols
        .filter(sym => sym.symbol.startsWith(ticker.toUpperCase()))
        .slice(0, 5);
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [ticker, validSymbols]);

  const resetForm = () => {
    setNome('');
    setTicker('');
    setSettore('');
    setAzioniPossedute('');
    setIsProfitable(true);
    setErrors({});
  };

  const validateFields = () => {
    const newErrors: { [key: string]: boolean } = {};
    if (!nome) newErrors.nome = true;
    if (!ticker) newErrors.ticker = true;
    if (!settore) newErrors.settore = true;
    if (!azioniPossedute) newErrors.azioniPossedute = true;
    if (
      ticker &&
      !loadingSymbols &&
      !validSymbols.some(s => s.symbol === ticker.toUpperCase())
    )
      newErrors.ticker = true;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const buildAzienda = (): Azienda => ({
    id:"23",
    nome,
    ticker,
    settore,
    azioniPossedute: parseInt(azioniPossedute),
    isProfitable,
  });

  return {
    nome, setNome,
    ticker, setTicker,
    settore, setSettore,
    azioniPossedute, setAzioniPossedute,
    isProfitable, setIsProfitable,
    errors, setErrors,
    validSymbols,
    loadingSymbols,
    suggestions,
    setSuggestions,
    resetForm,
    validateFields,
    buildAzienda,
  };
}