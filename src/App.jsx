// ACHD Material Control - Complete Modular Implementation
// Updated with modern dark mode design and full functionality preservation

import React, { useState, useMemo, useRef, useCallback, useEffect } from "react";
import Icon from './components/ui/Icon.jsx';
import StepBadge from './components/ui/StepBadge.jsx';
import Panel from './components/ui/Panel.jsx';
import ColorOption from './components/ui/ColorOption.jsx';

// Import all components
import Header from './components/Header.jsx';
import Dashboard from './components/Dashboard.jsx';
import ControleCaixas from './components/ControleCaixas.jsx';
import ConsultaEstoque from './components/ConsultaEstoque.jsx';
import MapaFisico from './components/MapaFisico.jsx';
import ImportadorPlanilha from './components/ImportadorPlanilha.jsx';
import ConfiguradorColunas from './components/ConfiguradorColunas.jsx';
import BuscaMaterial from './components/BuscaMaterial.jsx';
import Historico from './components/Historico.jsx';
import Movimentacoes from './components/Movimentacoes.jsx';
import ItensSelecionados from './components/ItensSelecionados.jsx';
import QRScanner from './components/QRScanner.jsx';
import DeleteBoxModal from './components/DeleteBoxModal.jsx';
import Backup from './components/Backup.jsx';

// Import services
import * as storageService from './services/storageService.js';
import * as excelService from './services/excelService.js';
import * as backupService from './services/backupService.js';
import * as qrService from './services/qrService.js';
import * as printService from './services/printService.js';
import * as downloadService from './services/downloadService.js';

// Import utils
import * as utils from './utils/validation.js';
import * as formatting from './utils/formatting.js';
import * as constants from './utils/constants.js';

// Extract functions for use
const {
  guessIdColumn,
  normalizeValue,
  getAvancoStatus,
  getManualHighlightColor,
  getRowColor
} = utils;

const { getExportFileName, nowDateString, nowTimeString } = formatting;

// Color constants for ACHD Material Control design
const ACHD_COLORS = {
  // Dark mode palette matching requirements
  bgDeep: '#0B0F19',
  bgSurface: '#111827',
  bgCard: '#1F2937',
  bgInput: '#0f1114',
  
  // Text colors
  textPrimary: '#E8F0EB',
  textSecondary: '#94a3b8',
  textMuted: '#64748b',
  
  // Accent colors - ACHD brand colors
  accentGreen: '#22C55E',  // Green for success/active states
  accentGreenDark: '#15803D',
  accentGreenLight: '#10b981',
  accentGreenBg: 'rgba(34, 197, 94, 0.10)',
  
  accentBlue: '#60A5FA',   // Blue for active elements
  accentBlueDark: '#2563EB',
  accentBlueBg: 'rgba(96, 165, 250, 0.14)',
  
  accentPurple: '#A78BFA', // Purple for highlights
  accentPurpleBg: 'rgba(167, 139, 250, 0.14)',
  
  accentRed: '#EF4444',    // Red for warnings/alerts
  accentRedBg: 'rgba(239, 68, 68, 0.12)',
  
  accentYellow: '#EAB308', // Yellow for attention
  accentYellowBg: 'rgba(234, 179, 8, 0.12)',
  
  borderColor: '#1e293b',
  borderStrong: '#334155',
  
  // Status colors
  statusSuccess: '#10b981',
  statusWarning: '#eab308',
  statusError: '#ef4444',
  statusInfo: '#3b82f6',
};

// Typography matching requirements
const TYPOGRAPHY = {
  fontSans: "'Inter', 'IBM Plex Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  fontMono: "'IBM Plex Mono', monospace",
  fontDisplay: "'Space Grotesk', sans-serif",
  
  // Font sizes for ACHD design
  h1: '28px',      // Large heading
  h2: '24px',      // Section titles
  h3: '20px',      // Card titles
  h4: '18px',      // Component labels
  body: '16px',    // Standard text
  bodySmall: '14px',// Secondary text
  caption: '12px', // Fine print
  
  
  // Font weights
  light: 400,
  normal: 500,
  medium: 600,
  semibold: 700,
  bold: 800,
  
  // Line heights
  tight: 1.2,
  normal: 1.5,
  relaxed: 1.8,
};

// Spacing system
const SPACING = {
  xs: '4px',
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '24px',
  '2xl': '32px',
  '3xl': '48px',
  '4xl': '64px',
  '5xl': '96px',
};

// Border radius for modern design
const BORDER_RADIUS = {
  none: '0',
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '20px',
  '2xl': '24px',
  round: '50%',
};

// Shadow system for depth
const SHADOWS = {
  none: 'none',
  sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 10px 15px -3px rgba(0, 0, 0, 0.3)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -4px rgba(0, 0, 0, 0.3)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.2)',
};

const App = () => {
  // State management matching original functionality
  const [fileName, setFileName] = useState("");
  const [headers, setHeaders] = useState([]);
  const [rows, setRows] = useState([]);
  const [sheets, setSheets] = useState([]);
  const [selectedSheets, setSelectedSheets] = useState([]);
  const [idColumn, setIdColumn] = useState("");
  const [displayColumns, setDisplayColumns] = useState([]);
  const [highlightedFields, setHighlightedFields] = useState(constants.DEFAULT_HIGHLIGHTED_FIELDS);
  const [highlightedFieldsColor, setHighlightedFieldsColor] = useState(constants.DEFAULT_HIGHLIGHT_COLOR);
  const [query, setQuery] = useState("");
  const [matched, setMatched] = useState(null);
  const [searchState, setSearchState] = useState("idle");
  const [dragOver, setDragOver] = useState(false);
  const [parseError, setParseError] = useState("");
  const [theme, setTheme] = useState(() => storageService.loadTheme());
  const [history, setHistory] = useState(() => storageService.loadHistory());
  const [showFullHistory, setShowFullHistory] = useState(false);
  const [boxes, setBoxes] = useState(() => storageService.loadBoxes());
  const [movements, setMovements] = useState(() => storageService.loadMovements());
  const [activeBoxId, setActiveBoxId] = useState("");
  const [newBoxDescription, setNewBoxDescription] = useState("");
  const [newBoxNote, setNewBoxNote] = useState("");
  const [inventoryQuery, setInventoryQuery] = useState("");
  const [showInventory, setShowInventory] = useState(false);
  const [exportMessage, setExportMessage] = useState("");
  const [deleteBoxCandidate, setDeleteBoxCandidate] = useState(null);
  const backupInputRef = useRef(null);
  const [lastProcessedCode, setLastProcessedCode] = useState("");
  const [colorRules, setColorRules] = useState(constants.DEFAULT_COLOR_RULES);
  const [highlightRule, setHighlightRule] = useState({ column: "", value: "", color: constants.DEFAULT_HIGHLIGHT_COLOR });
  const [scannerOpen, setScannerOpen] = useState(false);
  const [scannerStatus, setScannerStatus] = useState("");
  const inputRef = useRef(null);
  const searchInputRef = useRef(null);
  const scannerVideoRef = useRef(null);
  const scannerStreamRef = useRef(null);

  // Effects for persistent storage
  useEffect(() => {
    storageService.loadHistory().then(loaded => {
      setHistory(loaded);
    });
  }, []);

  useEffect(() => {
    storageService.saveBoxes(boxes);
  }, [boxes]);

  useEffect(() => {
    storageService.saveMovements(movements);
  }, [movements]);

  useEffect(() => {
    storageService.saveTheme(theme);
  }, [theme]);

  // Scanner effect - preserves original functionality
  useEffect(() => {
    if (!scannerOpen) return undefined;
    let cancelled = false;
    let animationFrame = 0;

    const stopStream = () => {
      if (scannerStreamRef.current) {
        scannerStreamRef.current.getTracks().forEach((track) => track.stop());
        scannerStreamRef.current = null;
      }
    };

    const scanFrame = async (detector) => {
      if (cancelled || !scannerVideoRef.current) return;
      try {
        const results = await detector.detect(scannerVideoRef.current);
        if (results.length > 0 && results[0].rawValue) {
          const value = results[0].rawValue;
          setScannerStatus("Leitura concluída");
          if (navigator.vibrate) navigator.vibrate(120);
          try {
            const audio = new AudioContext();
            const oscillator = audio.createOscillator();
            const gain = audio.createGain();
            oscillator.connect(gain);
            gain.connect(audio.destination);
            oscillator.frequency.value = 880;
            gain.gain.setValueAtTime(0.08, audio.currentTime);
            oscillator.start();
            oscillator.stop(audio.currentTime + 0.12);
          } catch (error) {
          }
          stopStream();
          setScannerOpen(false);
          processQRCode(value);
          return;
        }
      } catch (error) {
        setScannerStatus("Aponte a câmera para um QR Code");
      }
      animationFrame = requestAnimationFrame(() => scanFrame(detector));
    };

    const startScanner = async () => {
      if (!navigator.mediaDevices?.getUserMedia) {
        setScannerStatus("Câmera indisponível. Digite o código abaixo.");
        return;
      }
      if (!window.BarcodeDetector) {
        setScannerStatus("Este navegador não detecta QR automaticamente. Digite o código abaixo.");
        return;
      }
      try {
        setScannerStatus("Solicitando acesso à câmera...");
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: { ideal: "environment" } },
          audio: false
        });
        if (cancelled || !scannerVideoRef.current) {
          stream.getTracks().forEach((track) => track.stop());
          return;
        }
        scannerStreamRef.current = stream;
        scannerVideoRef.current.srcObject = stream;
        await scannerVideoRef.current.play();
        setScannerStatus("Aponte a câmera para um QR Code");
        scanFrame(new BarcodeDetector({ formats: ["qr_code"] }));
      } catch (error) {
        setScannerStatus("Não foi possível acessar a câmera. Verifique a permissão.");
      }
    };

    startScanner();
    return () => {
      cancelled = true;
      cancelAnimationFrame(animationFrame);
      stopStream();
    };
  }, [scannerOpen]);

  // Derived state calculations
  const hasData = rows.length > 0 && headers.length > 0;

  const selectedRows = useMemo(
    () => rows.filter((row) => selectedSheets.includes(row.__sheetName)),
    [rows, selectedSheets]
  );

  const readyToSearch = hasData && idColumn && selectedRows.length > 0;

  useEffect(() => {
    if (readyToSearch && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [readyToSearch]);

  const matchedRowColor = matched
    ? getRowColor(matched.__sheetName, matched, colorRules)
    : "";

  const matchedAvancoStatus = matched ? getAvancoStatus(matched) : "";

  const matchedAvancoColor =
    matchedAvancoStatus === "sim"
      ? colorRules.avanco.sim
      : matchedAvancoStatus === "nao"
        ? colorRules.avanco.nao
        : "";

  const matchedAvancoTextColor =
    matchedAvancoStatus === "sim" ? constants.GREEN : constants.RED;

  const matchedAvancoValue =
    matched
      ? Object.entries(matched).find(
          ([key]) => ["avanco", "avanço"].includes(normalizeValue(key))
        )?.[1]
      : "";

  const foundMaterialsCount =
    history.filter((item) => item.status === "ENCONTRADO").length;

  const notFoundMaterialsCount =
    history.filter((item) => item.status === "NÃO ENCONTRADO").length;

  const latestReading = history[0];

  const activeBox =
    boxes.find((box) => box.id === activeBoxId) || null;

  const inventoryRecords =
    history.map((item) => ({
      ...item,
      description: displayColumns[0] ? item.rowData?.[displayColumns[0]] || "" : "",
      box: boxes.find((box) => box.materials?.some((material) => normalizeValue(material.code) === normalizeValue(item.code))) || null
    }));

  const filteredInventory =
    inventoryRecords.filter((item) => {
      const term = normalizeValue(inventoryQuery);
      if (!term) return true;
      return [item.code, item.description, item.box?.number, item.date, item.status]
        .some((value) => normalizeValue(value).includes(term));
    });

  // File processing functions
  const processFile = useCallback((file) => {
    if (!file) {
      return;
    }
    setParseError("");
    excelService.readSpreadsheetFile(file)
      .then(({ sheets: parsedSheets, headers: hdrs, rows: allRows }) => {
        setSheets(parsedSheets);
        setSelectedSheets(parsedSheets.map((sheet) => sheet.name));
        setHeaders(hdrs);
        setRows(allRows);
        setFileName(file.name);
        const guessed = guessIdColumn(hdrs);
        setIdColumn(guessed);
        setDisplayColumns(hdrs.filter((h) => h !== guessed));
        setQuery("");
        setMatched(null);
        setSearchState("idle");
      })
      .catch((err) => {
        console.error(err);
        setParseError(err?.message || "Não foi possível ler este arquivo. Confirme se é um .xlsx, .xls ou .csv válido.");
      });
  }, []);

  const handleFileInput = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files && e.dataTransfer.files[0];
    if (file) {
      processFile(file);
    }
  };

  const resetAll = () => {
    setFileName("");
    setHeaders([]);
    setRows([]);
    setSheets([]);
    setSelectedSheets([]);
    setIdColumn("");
    setDisplayColumns([]);
    setQuery("");
    setMatched(null);
    setSearchState("idle");
    setParseError("");
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const suggestions = useMemo(() => {
    if (!readyToSearch || !query.trim()) {
      return [];
    }
    const q = query.trim().toLowerCase();
    return selectedRows
      .filter((r) =>
        String(r[idColumn] ?? "")
          .toLowerCase()
          .includes(q)
      )
      .slice(0, 8);
  }, [selectedRows, idColumn, query, readyToSearch]);

  const runSearch = (value) => {
    const q = String(value ?? query).trim().toLowerCase();
    if (!q) {
      setMatched(null);
      setSearchState("idle");
      return;
    }
    const exact = selectedRows.find(
      (r) =>
        String(r[idColumn] ?? "")
          .trim()
          .toLowerCase() === q
    );
    if (exact) {
      setMatched(exact);
      setSearchState("found");
    } else {
      setMatched(null);
      setSearchState("notfound");
    }
  };

  const loadHistory = () => {
    try {
      const savedHistory = storageService.loadHistory();
      setHistory(savedHistory);
      return savedHistory;
    } catch (error) {
      console.warn("Não foi possível carregar o histórico.", error);
      return [];
    }
  };

  const addToHistory = (code, exact, date, time) => {
    const rowData = exact
      ? headers.reduce((data, header) => ({
          ...data,
          [header]: exact[header] ?? ""
        }), {})
      : {};
    const status = exact ? "ENCONTRADO" : "NÃO ENCONTRADO";
    setHistory((previousHistory) => {
      const nextNumber = previousHistory.reduce(
        (highest, item) => Math.max(highest, Number(item.number) || 0),
        0
      ) + 1;
      const record = {
        number: nextNumber,
        date,
        time,
        code,
        status,
        sheetName: exact?.__sheetName || "",
        rowData
      };
      const nextHistory = [record, ...previousHistory];
      storageService.saveHistory(nextHistory);
      return nextHistory;
    });
  };

  const addMovement = (action, code, exact, boxNumber = "") => {
    const now = new Date();
    const movement = {
      id: `${now.getTime()}-${Math.random().toString(36).slice(2, 8)}`,
      date: now.toLocaleDateString("pt-BR"),
      time: now.toLocaleTimeString("pt-BR", { hour12: false }),
      code,
      description: exact && displayColumns[0] ? exact[displayColumns[0]] || "" : "",
      action,
      box: boxNumber,
      user: ""
    };
    setMovements((previous) => [movement, ...previous]);
  };

  const createBox = () => {
    const now = new Date();
    const nextNumber = boxes.reduce((max, box) => Math.max(max, Number(box.number) || 0), 0) + 1;
    const box = {
      id: `box-${now.getTime()}`,
      number: String(nextNumber).padStart(3, "0"),
      description: newBoxDescription.trim(),
      note: newBoxNote.trim(),
      createdAt: now.toLocaleDateString("pt-BR"),
      status: "ABERTA",
      materials: []
    };
    setBoxes((previous) => [box, ...previous]);
    setActiveBoxId(box.id);
    setNewBoxDescription("");
    setNewBoxNote("");
  };

  const requestDeleteBox = (box) => setDeleteBoxCandidate(box);

  const confirmDeleteBox = () => {
    if (!deleteBoxCandidate) return;
    const materialCodes = (deleteBoxCandidate.materials || []).map((material) => normalizeValue(material.code));
    setBoxes((previous) => previous.filter((box) => box.id !== deleteBoxCandidate.id));
    if (materialCodes.length) {
      setHistory((previous) => {
        const nextHistory = previous.filter((item) => !materialCodes.includes(normalizeValue(item.code)));
        storageService.saveHistory(nextHistory);
        return nextHistory;
      });
    }
    setMovements((previous) => [{
      id: `box-delete-${Date.now()}`,
      date: new Date().toLocaleDateString("pt-BR"),
      time: new Date().toLocaleTimeString("pt-BR", { hour12: false }),
      code: `CX${deleteBoxCandidate.number}`,
      description: deleteBoxCandidate.description || "",
      action: "CAIXA EXCLUÍDA",
      box: deleteBoxCandidate.number,
      user: ""
    }, ...previous]);
    if (activeBoxId === deleteBoxCandidate.id) setActiveBoxId("");
    setDeleteBoxCandidate(null);
    setExportMessage(`CAIXA ${deleteBoxCandidate.number} excluída${materialCodes.length ? ` e ${materialCodes.length} material(is) removido(s) do estoque` : ""}.`);
  };

  const finishActiveBox = () => {
    if (!activeBox) return;
    setBoxes((previous) => previous.map((box) => box.id === activeBox.id ? { ...box, status: "ARMAZENADA" } : box));
    addMovement("CAIXA FINALIZADA", "", null, activeBox.number);
    setActiveBoxId("");
  };

  const updateBoxForMaterial = (code, exact, date, time) => {
    if (!activeBox) return;
    const existingBox = boxes.find((box) => box.materials?.some((material) => normalizeValue(material.code) === normalizeValue(code)));
    if (existingBox && existingBox.id !== activeBox.id) {
      const shouldTransfer = window.confirm(`Este material já está armazenado na CAIXA ${existingBox.number}.\n\nOK: transferir para ${activeBox.number}\nCancelar: manter na caixa atual`);
      if (!shouldTransfer) return;
      setBoxes((previous) => previous.map((box) => {
        if (box.id === existingBox.id) return { ...box, materials: box.materials.filter((material) => normalizeValue(material.code) !== normalizeValue(code)) };
        if (box.id === activeBox.id) return { ...box, materials: [...(box.materials || []), { code, description: exact && displayColumns[0] ? exact[displayColumns[0]] || "" : "", date, time }] };
        return box;
      }));
      addMovement("TRANSFERIDO", code, exact, activeBox.number);
      return;
    }
    if (existingBox && existingBox.id === activeBox.id) {
      if (!window.confirm("ATENÇÃO: este material já foi registrado nesta caixa.\n\nAdicionar novamente?")) return;
    }
    setBoxes((previous) => previous.map((box) => box.id === activeBox.id ? {
      ...box,
      materials: [...(box.materials || []), { code, description: exact && displayColumns[0] ? exact[displayColumns[0]] || "" : "", date, time }]
    } : box));
    addMovement(existingBox ? "BIPADO NOVAMENTE" : "BIPADO", code, exact, activeBox.number);
  };

  const processQRCode = (value) => {
    const code = String(value ?? "").trim();
    const scannedBox = boxes.find((box) => normalizeValue(`CX${box.number}`) === normalizeValue(code) || normalizeValue(`CAIXA-${box.number}`) === normalizeValue(code) || normalizeValue(`CAIXA ${box.number}`) === normalizeValue(code));
    if (scannedBox) {
      setActiveBoxId(scannedBox.id);
      setLastProcessedCode(code);
      setSearchState("found");
      setExportMessage(`CAIXA ${scannedBox.number} ATIVA`);
      if (navigator.vibrate) navigator.vibrate(100);
      return;
    }
    if (!code || !readyToSearch) {
      if (searchInputRef.current) searchInputRef.current.focus();
      return;
    }
    const exact = selectedRows.find(
      (row) => normalizeValue(row[idColumn]) === normalizeValue(code)
    );
    const now = new Date();
    const date = now.toLocaleDateString("pt-BR");
    const time = now.toLocaleTimeString("pt-BR", { hour12: false });
    setLastProcessedCode(code);
    setQuery("");
    if (exact) {
      setMatched(exact);
      setSearchState("found");
    } else {
      setMatched(null);
      setSearchState("notfound");
    }
    addToHistory(code, exact, date, time);
    updateBoxForMaterial(code, exact, date, time);
    requestAnimationFrame(() => {
      if (searchInputRef.current) searchInputRef.current.focus();
    });
  };

  const clearHistory = () => {
    if (!history.length) return;
    if (window.confirm("Deseja realmente limpar todo o histórico de leituras?")) {
      storageService.removeHistory();
      setHistory([]);
    }
  };

  const exportHistory = () => {
    if (!history.length) return;
    excelService.exportHistoryWorkbook(history, headers);
  };

  const getExportRows = () => history.slice().reverse().map((item) => ({
    Codigo: item.code,
    Descricao: displayColumns[0] ? item.rowData?.[displayColumns[0]] || "" : "",
    Data: item.date,
    Hora: item.time,
    Usuario: item.user || "",
    Status: item.status,
    Caixa: boxes.find((box) => box.materials?.some((material) => normalizeValue(material.code) === normalizeValue(item.code)))?.number || ""
  }));

  const getExportFileName = (extension, prefix = "Historico_Bipagens") => {
    const now = new Date();
    const stamp = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}_${String(now.getHours()).padStart(2, "0")}-${String(now.getMinutes()).padStart(2, "0")}`;
    return `${prefix}_${stamp}.${extension}`;
  };

  const saveLocalHistory = async (format = "xlsx") => {
    if (!history.length) {
      setExportMessage("Não há bipagens para exportar.");
      return;
    }
    const fileName = getExportFileName(format);
    const rowsToExport = getExportRows();
    let blob;
    if (format === "csv") {
      const worksheet = excelService.buildBipagensRows(history, displayColumns, boxes);
      const csv = excelService.buildHistoryBlob(rowsToExport, "csv");
      blob = new Blob(["\ufeff", csv], { type: "text/csv;charset=utf-8" });
    } else {
      const worksheet = excelService.buildBipagensRows(history, displayColumns, boxes);
      const workbook = excelService.buildHistoryBlob(rowsToExport, "xlsx");
      blob = new Blob([XLSX.write(workbook, { bookType: "xlsx", type: "array" })], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    }
    try {
      if (window.showDirectoryPicker) {
        const directory = await window.showDirectoryPicker({ mode: "readwrite" });
        const root = await directory.getDirectoryHandle("Controle de Estoque", { create: true });
        const historyDirectory = await root.getDirectoryHandle("Historico", { create: true });
        const fileHandle = await historyDirectory.getFileHandle(fileName, { create: true });
        const writable = await fileHandle.createWritable();
        await writable.write(blob);
        await writable.close();
        setExportMessage("Histórico salvo com sucesso em: Controle de Estoque > Historico");
        return;
      }
    } catch (error) {
      if (error?.name === "AbortError") return;
    }
    const downloadService = excelService.downloadBlob(blob, fileName);
    setExportMessage(`Download criado: ${fileName}`);
  };

  const exportFullBackup = () => {
    const payload = backupService.buildBackupPayload({ history, boxes, movements, rows, headers, selectedSheets, idColumn, displayColumns });
    backupService.exportFullBackup(payload);
    setExportMessage("Backup completo exportado com sucesso.");
  };

  const restoreBackup = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const payload = JSON.parse(reader.result);
        if (payload.version !== constants.BACKUP_VERSION || !Array.isArray(payload.history) || !Array.isArray(payload.boxes)) throw new Error("Formato inválido");
        if (!window.confirm("Restaurar o backup substituirá os dados locais atuais. Continuar?")) {
          event.target.value = "";
          return;
        }
        setHistory(payload.history);
        setBoxes(payload.boxes);
        setMovements(Array.isArray(payload.movements) ? payload.movements : []);
        setRows(Array.isArray(payload.rows) ? payload.rows : []);
        setHeaders(Array.isArray(payload.headers) ? payload.headers : []);
        setSelectedSheets(Array.isArray(payload.selectedSheets) ? payload.selectedSheets : []);
        setIdColumn(payload.idColumn || "");
        setDisplayColumns(Array.isArray(payload.displayColumns) ? payload.displayColumns : []);
        storageService.saveHistory(payload.history);
        storageService.saveBoxes(payload.boxes);
        storageService.saveMovements(Array.isArray(payload.movements) ? payload.movements : []);
        setExportMessage("Backup restaurado com sucesso.");
      } catch (error) {
        setExportMessage("Não foi possível restaurar este backup.");
      }
      event.target.value = "";
    };
    reader.readAsText(file);
  };

  const exportBox = (box, format) => {
    if (!box) return;
    const rowsToExport = excelService.buildBoxRows(box);
    const worksheet = excelService.buildBoxRows(box);
    if (format === "pdf") {
      printService.printBoxPdf(box, rowsToExport);
      return;
    }
    if (format === "csv") {
      excelService.exportBoxSpreadsheet(box, format);
      return;
    }
    excelService.exportBoxSpreadsheet(box, "xlsx");
  };

  const searchExactCodeAutomatically = (value) => {
    const normalizedQuery = normalizeValue(value);
    if (!normalizedQuery) {
      return;
    }
    const exact = selectedRows.find(
      (row) => normalizeValue(row[idColumn]) === normalizedQuery
    );
    if (exact) {
      setMatched(exact);
      setSearchState("found");
    }
  };

  const toggleColumn = (h) => {
    setDisplayColumns(
      (prev) =>
        prev.includes(h)
          ? prev.filter((c) => c !== h)
          : [...prev, h]
    );
  };

  const updateColorRule = (group, key, value) => {
    setColorRules((prev) => ({
      ...prev,
      [group]: {
        ...prev[group],
        [key]: value
      }
    }));
  };

  const toggleHighlightedField = (field) => {
    setHighlightedFields((previous) =>
      previous.includes(field)
        ? previous.filter((item) => item !== field)
        : [...previous, field]
    );
  };

  const runSearch = (value) => {
    const q = String(value ?? query).trim().toLowerCase();
    if (!q) {
      setMatched(null);
      setSearchState("idle");
      return;
    }
    const exact = selectedRows.find(
      (r) =>
        String(r[idColumn] ?? "")
          .trim()
          .toLowerCase() === q
    );
    if (exact) {
      setMatched(exact);
      setSearchState("found");
    } else {
      setMatched(null);
      setSearchState("notfound");
    }
  };

  const onInputKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const scannedValue = e.currentTarget.value;
      processQRCode(scannedValue);
    }
  };

  const toggleSheet = (name, checked) => {
    setSelectedSheets((prev) => checked ? prev.filter((n) => n !== name) : [...prev, name]);
  };

  const updateBoxForMaterial = (code, exact, date, time) => {
    if (!activeBox) return;
    const existingBox = boxes.find((box) => box.materials?.some((material) => normalizeValue(material.code) === normalizeValue(code)));
    if (existingBox && existingBox.id !== activeBox.id) {
      const shouldTransfer = window.confirm(`Este material já está armazenado na CAIXA ${existingBox.number}.\n\nOK: transferir para ${activeBox.number}\nCancelar: manter na caixa atual`);
      if (!shouldTransfer) return;
      setBoxes((previous) => previous.map((box) => {
        if (box.id === existingBox.id) return { ...box, materials: box.materials.filter((material) => normalizeValue(material.code) !== normalizeValue(code)) };
        if (box.id === activeBox.id) return { ...box, materials: [...(box.materials || []), { code, description: exact && displayColumns[0] ? exact[displayColumns[0]] || "" : "", date, time }] };
        return box;
      }));
      addMovement("TRANSFERIDO", code, exact, activeBox.number);
      return;
    }
    if (existingBox && existingBox.id === activeBox.id) {
      if (!window.confirm("ATENÇÃO: este material já foi registrado nesta caixa.\n\nAdicionar novamente?")) return;
    }
    setBoxes((previous) => previous.map((box) => box.id === activeBox.id ? {
      ...box,
      materials: [...(box.materials || []), { code, description: exact && displayColumns[0] ? exact[displayColumns[0]] || "" : "", date, time }]
    } : box));
    addMovement(existingBox ? "BIPADO NOVAMENTE" : "BIPADO", code, exact, activeBox.number);
  };

  const processQRCode = (value) => {
    const code = String(value ?? "").trim();
    const scannedBox = boxes.find((box) => normalizeValue(`CX${box.number}`) === normalizeValue(code) || normalizeValue(`CAIXA-${box.number}`) === normalizeValue(code) || normalizeValue(`CAIXA ${box.number}`) === normalizeValue(code));
    if (scannedBox) {
      setActiveBoxId(scannedBox.id);
      setLastProcessedCode(code);
      setSearchState("found");
      setExportMessage(`CAIXA ${scannedBox.number} ATIVA`);
      if (navigator.vibrate) navigator.vibrate(100);
      return;
    }
    if (!code || !readyToSearch) {
      if (searchInputRef.current) searchInputRef.current.focus();
      return;
    }
    const exact = selectedRows.find(
      (row) => normalizeValue(row[idColumn]) === normalizeValue(code)
    );
    const now = new Date();
    const date = now.toLocaleDateString("pt-BR");
    const time = now.toLocaleTimeString("pt-BR", { hour12: false });
    setLastProcessedCode(code);
    setQuery("");
    if (exact) {
      setMatched(exact);
      setSearchState("found");
    } else {
      setMatched(null);
      setSearchState("notfound");
    }
    addToHistory(code, exact, date, time);
    updateBoxForMaterial(code, exact, date, time);
    requestAnimationFrame(() => {
      if (searchInputRef.current) searchInputRef.current.focus();
    });
  };

  const saveLocalHistory = async (format = "xlsx") => {
    if (!history.length) {
      setExportMessage("Não há bipagens para exportar.");
      return;
    }
    const fileName = getExportFileName(format);
    const rowsToExport = getExportRows();
    let blob;
    if (format === "csv") {
      const worksheet = excelService.buildBipagensRows(history, displayColumns, boxes);
      const csv = XLSX.utils.sheet_to_csv(worksheet);
      blob = new Blob(["\ufeff", csv], { type: "text/csv;charset=utf-8" });
    } else {
      const worksheet = excelService.buildBipagensRows(history, displayColumns, boxes);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Bipagens");
      blob = new Blob([XLSX.write(workbook, { bookType: "xlsx", type: "array" })], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    }
    try {
      if (window.showDirectoryPicker) {
        const directory = await window.showDirectoryPicker({ mode: "readwrite" });
        const root = await directory.getDirectoryHandle("Controle de Estoque", { create: true });
        const historyDirectory = await root.getDirectoryHandle("Historico", { create: true });
        const fileHandle = await historyDirectory.getFileHandle(fileName, { create: true });
        const writable = await fileHandle.createWritable();
        await writable.write(blob);
        await writable.close();
        setExportMessage("Histórico salvo com sucesso em: Controle de Estoque > Historico");
        return;
      }
    } catch (error) {
      if (error?.name === "AbortError") return;
    }
    const downloadService = excelService.downloadBlob(blob, fileName);
    setExportMessage(`Download criado: ${fileName}`);
  };

  const onClearQuery = () => {
    setQuery("");
    setMatched(null);
    setSearchState("idle");
  };

  const onRunSearch = (query) => runSearch(query);

  const onOpenScanner = () => {
    setScannerStatus("");
    setScannerOpen(true);
  };

  const toggleHighlightedField = (field) => {
    setHighlightedFields((previous) =>
      previous.includes(field)
        ? previous.filter((item) => item !== field)
        : [...previous, field]
    );
  };

  const onSelectIdColumn = (value) => {
    setIdColumn(value);
    setDisplayColumns(headers.filter((h) => h !== value));
    setQuery("");
    setMatched(null);
    setSearchState("idle");
  };

  const onToggleSheet = (name, checked) => {
    setSelectedSheets((prev) => checked ? prev.filter((n) => n !== name) : [...prev, name]);
  };

  const onUpdateColorRule = (group, key, value) => {
    setColorRules((prev) => ({
      ...prev,
      [group]: {
        ...prev[group],
        [key]: value
      }
    }));
  };

  const onHighlightColumnChange = (value) => {
    setHighlightRule((previous) => ({ ...previous, column: value }));
  };

  const onHighlightValueChange = (value) => {
    setHighlightRule((previous) => ({ ...previous, value: value }));
  };

  const onHighlightColorChange = (value) => {
    setHighlightRule((previous) => ({ ...previous, color: value }));
  };

  const onToggleColumn = (h) => {
    setDisplayColumns(
      (prev) =>
        prev.includes(h)
          ? prev.filter((c) => c !== h)
          : [...prev, h]
    );
  };

  const onInputKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const scannedValue = e.currentTarget.value;
      processQRCode(scannedValue);
    }
  };

  return (
    <div
      className={`app-shell ${theme === "dark" ? "dark" : "light"}`}
      style={{
        fontFamily: "'IBM Plex Sans', sans-serif",
        background: constants.PAPER,
        minHeight: "100vh",
        padding: "32px 20px",
        color: constants.INK
      }}
    >
      <style>{constants.FONT_IMPORT}</style>

      {/* Header */}
      <Header theme={theme} onToggleTheme={() => setTheme((current) => current === "dark" ? "light" : "dark")} />

      {/* KPI Cards */}
      <Dashboard
        rows={rows}
        history={history}
        boxes={boxes}
        latestReading={latestReading}
      />

      {/* Main Content Grid */}
      <div className="app-content">
        <div className="desktop-main-grid">
          {/* Left Panel: Historical Data */}
          <div className="panel-full">
            <Historico
              history={history}
              showFullHistory={showFullHistory}
              foundMaterialsCount={foundMaterialsCount}
              displayColumns={displayColumns}
              onExportHistory={exportHistory}
              onClearHistory={clearHistory}
              onSaveHistory={saveLocalHistory}
              onExportBackup={exportFullBackup}
              onRestoreFile={restoreBackup}
              onToggleFullHistory={() => setShowFullHistory((current) => !current)}
            />
          </div>

          {/* Right Panel: Movements */}
          <div>
            <Movimentacoes
              movements={movements}
              showFullHistory={showFullHistory}
            />
          </div>
        </div>
      </div>

      {/* Step 1: Import Spreadsheet */}
      <ImportadorPlanilha
        hasData={hasData}
        fileName={fileName}
        rowCount={rows.length}
        columnCount={headers.length}
        dragOver={dragOver}
        parseError={parseError}
        inputRef={inputRef}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onOpenPicker={() => inputRef.current?.click()}
        onFileInputChange={handleFileInput}
        onReset={resetAll}
      />

      {/* Step 2: Configure Columns */}
      <ConfiguradorColunas
        hasData={hasData}
        headers={headers}
        idColumn={idColumn}
        displayColumns={displayColumns}
        highlightedFields={highlightedFields}
        highlightedFieldsColor={highlightedFieldsColor}
        sheets={sheets}
        selectedSheets={selectedSheets}
        colorRules={colorRules}
        highlightRule={highlightRule}
        onSelectIdColumn={setIdColumn}
        onToggleColumn={toggleColumn}
        onToggleHighlightedField={toggleHighlightedField}
        onHighlightedFieldsColorChange={setHighlightedFieldsColor}
        onToggleSheet={toggleSheet}
        onUpdateColorRule={updateColorRule}
        onHighlightColumnChange={(value) => setHighlightRule((prev) => ({ ...prev, column: value }))}
        onHighlightValueChange={(value) => setHighlightRule((prev) => ({ ...prev, value: value }))}
        onHighlightColorChange={(value) => setHighlightRule((prev) => ({ ...prev, color: value }))}
      />

      {/* Step 3: Search Material */}
      <BuscaMaterial
        readyToSearch={readyToSearch}
        idColumn={idColumn}
        query={query}
        searchState={searchState}
        matched={matched}
        matchedRowColor={matchedRowColor}
        matchedAvancoStatus={matchedAvancoStatus}
        matchedAvancoColor={matchedAvancoColor}
        matchedAvancoTextColor={matchedAvancoTextColor}
        matchedAvancoValue={matchedAvancoValue}
        suggestions={suggestions}
        displayColumns={displayColumns}
        highlightedFields={highlightedFields}
        highlightedFieldsColor={highlightedFieldsColor}
        lastProcessedCode={lastProcessedCode}
        searchInputRef={searchInputRef}
        onQueryChange={setQuery}
        onInputKeyDown={onInputKeyDown}
        onClearQuery={onClearQuery}
        onRunSearch={runSearch}
        onOpenScanner={() => {
          setScannerStatus("");
          setScannerOpen(true);
        }}
      />

      {/* Step 4: Historical Data (Panel) */}
      <Panel
        step={4}
        title="Histórico de leituras"
        description="Acompanhe os materiais identificados pelos QR Codes"
        active={true}
        trailing={
          <div className="panel-actions">
            <div
              className="history-counter"
              title="Materiais encontrados"
            >
              <span className="history-counter-value">
                {foundMaterialsCount}
              </span>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase" }}>
                Materiais encontrados
              </span>
            </div>
            <button
              onClick={exportHistory}
              disabled={!history.length}
              style={{
                border: `1px solid ${history.length ? constants.GREEN : constants.LINE_STRONG}`,
                borderRadius: 4,
                padding: "6px 10px",
                background: history.length ? constants.GREEN : "transparent",
                color: history.length ? "#fff" : constants.INK_SOFT,
                cursor: history.length ? "pointer" : "not-allowed",
                fontSize: 12
              }}
            >
              EXPORTAR HISTÓRICO
            </button>
            <button
              onClick={clearHistory}
              disabled={!history.length}
              style={{
                border: `1px solid ${history.length ? constants.RED : constants.LINE_STRONG}`,
                borderRadius: 4,
                padding: "6px 10px",
                background: "transparent",
                color: history.length ? constants.RED : constants.INK_SOFT,
                cursor: history.length ? "pointer" : "not-allowed",
                fontSize: 12
              }}
            >
              Limpar histórico
            </button>
            <Backup
              historyLength={history.length}
              onSaveHistory={saveLocalHistory}
              onExportBackup={exportFullBackup}
              onRestoreFile={restoreBackup}
            />
            <button
              onClick={() => setShowFullHistory((current) => !current)}
              disabled={history.length <= 10}
              style={{
                border: `1px solid ${history.length > 10 ? constants.GREEN : constants.LINE_STRONG}`,
                borderRadius: 4,
                padding: "6px 10px",
                background: "transparent",
                color: history.length > 10 ? constants.GREEN : constants.INK_SOFT,
                cursor: history.length > 10 ? "pointer" : "not-allowed",
                fontSize: 12
              }}
            >
              {showFullHistory ? "MOSTRAR ÚLTIMOS 10" : "VER HISTÓRICO COMPLETO"}
            </button>
          </div>
        }
      >
        {!history.length ? (
          <div style={{ fontSize: 13, color: constants.INK_SOFT }}>
            Os QR Codes bipados aparecerão aqui.
          </div>
        ) : (
          <>
            <div className="history-table-wrap">
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12.5 }}>
                <thead>
                  <tr>
                    {["Nº", "Data", "Hora", "QR Code", "Status", ...displayColumns.slice(0, 2)].map((header) => (
                      <th
                        key={header}
                        style={{
                          textAlign: "left",
                          padding: "8px 10px",
                          borderBottom: `2px solid ${constants.GREEN}`,
                          color: constants.INK,
                          whiteSpace: "nowrap"
                        }}
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {history.slice(0, showFullHistory ? history.length : 10).map((item) => (
                    <tr key={`${item.number}-${item.date}-${item.time}`}>
                      <td style={{ padding: "7px 10px", borderBottom: `1px solid ${constants.LINE}`, fontFamily: "'IBM Plex Mono', monospace" }}>{item.number}</td>
                      <td style={{ padding: "7px 10px", borderBottom: `1px solid ${constants.LINE}`, whiteSpace: "nowrap" }}>{item.date}</td>
                      <td style={{ padding: "7px 10px", borderBottom: `1px solid ${constants.LINE}`, whiteSpace: "nowrap" }}>{item.time}</td>
                      <td style={{ padding: "7px 10px", borderBottom: `1px solid ${constants.LINE}`, fontFamily: "'IBM Plex Mono', monospace", whiteSpace: "nowrap" }}>{item.code}</td>
                      <td
                        style={{
                          padding: "7px 10px",
                          borderBottom: `1px solid ${constants.LINE}`,
                          color: item.status === "ENCONTRADO" ? constants.GREEN : constants.RED,
                          fontWeight: 700,
                          whiteSpace: "nowrap"
                        }}
                      >
                        {item.status}
                      </td>
                      {displayColumns.slice(0, 2).map((header) => (
                        <td key={header} style={{ padding: "7px 10px", borderBottom: `1px solid ${constants.LINE}`, whiteSpace: "nowrap" }}>
                          {item.rowData?.[header] || "-"}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="history-cards">
              {history.slice(0, showFullHistory ? history.length : 10).map((item) => (
                <article className="history-card" key={`card-${item.number}-${item.date}-${item.time}`}>
                  <div>
                    <div className="history-card-label">Código</div>
                    <div className="history-card-value history-card-code">{item.code}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div className="history-card-label">Status</div>
                    <div className="history-card-value" style={{ color: item.status === "ENCONTRADO" ? constants.GREEN : constants.RED, fontWeight: 700 }}>{item.status}</div>
                  </div>
                  <div>
                    <div className="history-card-label">Item</div>
                    <div className="history-card-value">{displayColumns[0] ? item.rowData?.[displayColumns[0]] || "-" : "-"}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div className="history-card-label">Data e hora</div>
                    <div className="history-card-value">{item.date} {item.time}</div>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}
      </Panel>
    </div>

      {/* Scanner Modal */}
      <QRScanner
        open={scannerOpen}
        status={scannerStatus}
        videoRef={scannerVideoRef}
        onClose={() => setScannerOpen(false)}
      />

      {/* Delete Box Modal */}
      <DeleteBoxModal
        candidate={deleteBoxCandidate}
        onCancel={() => setDeleteBoxCandidate(null)}
        onConfirm={confirmDeleteBox}
      />
    </div>
  );
}

export default App;
