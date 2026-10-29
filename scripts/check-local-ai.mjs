/* Authenticated connectivity check only; never loads or switches a model. */
const base = process.env.LOCAL_AI_BASE_URL || 'http://127.0.0.1:43922/v1';
try {
  const url = new URL(base);
  if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password || url.search || url.hash || !/\/v1\/?$/.test(url.pathname)) throw Error('LOCAL_AI_BASE_URL 格式錯誤');
  if (!process.env.LOCAL_AI_API_KEY) throw Error('缺少 LOCAL_AI_API_KEY');
  const response = await fetch(base.replace(/\/$/, '') + '/models', { redirect: 'error', headers: { Authorization: 'Bearer ' + process.env.LOCAL_AI_API_KEY }, signal: AbortSignal.timeout(20000) });
  if (!response.ok) throw Error('閘道 HTTP ' + response.status);
  const data = await response.json();
  if (!Array.isArray(data.data)) throw Error('閘道模型列表格式錯誤');
  const wanted = process.env.LOCAL_AI_MODEL || 'qwen36';
  if (!data.data.some(m => m.id === wanted)) throw Error('LOCAL_AI_MODEL 未登記於管理器');
  console.log('✅ Port Monitor 閘道可達、認證成功、模型已登記（未執行推理）');
} catch (error) { console.error('❌ ' + (error.message.startsWith('fetch') ? '閘道連線失敗' : error.message)); process.exitCode = 1; }
