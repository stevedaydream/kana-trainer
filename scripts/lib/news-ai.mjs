/* Local-first generation, with the same strict validation on both providers. */
export async function generateWithFallback({ local, cloud, validate, env = process.env, report = console.warn }) {
  const mode = env.NEWS_AI_PROVIDER || 'auto';
  const fallback = env.NEWS_AI_FALLBACK || 'gemini';
  if (!['auto', 'openai', 'gemini'].includes(mode) || !['gemini', 'none'].includes(fallback)) throw Error('新聞 AI provider / fallback 設定不合法');
  const attempt = async (generate, provider, isFallback) => {
    const pack = await generate();
    await validate(pack);
    return { pack, provider, isFallback };
  };
  if (mode === 'gemini') return attempt(cloud, 'gemini', false);
  try {
    if (env.LOCAL_AI_SKIP === '1') throw Error('本地網路不可用');
    return await attempt(local, 'openai', false);
  } catch (error) {
    // No exception text: provider errors may contain credentials or private endpoints.
    const reason = error.code === 'NEWS_VALIDATION_FAILED' ? '教材驗證不合格' : Number.isInteger(error.status) ? 'HTTP ' + error.status : '連線、逾時或 JSON 失敗';
    if (mode === 'openai' || fallback === 'none') throw Error('本地 AI ' + reason + '；未啟用雲端備援');
    report('⚠ 本地 AI ' + reason + '，改用 Gemini 雲端備援。');
    try { return await attempt(cloud, 'gemini', true); }
    catch (_) { throw Error('本地 AI 與 Gemini 備援皆未產出有效教材，原新聞與索引保持不變'); }
  }
}
