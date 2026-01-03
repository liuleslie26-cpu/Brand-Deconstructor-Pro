
import { BrandModule } from './types';

export const BRAND_MODULES: BrandModule[] = [
  {
    id: 1,
    title: "哲学、使命与战略顶层 / Philosophy, Mission & Strategic Top-level",
    core: "研究品牌的“元起点”与“终局观” / Researching the brand's 'Meta-origin' and 'End-game view'",
    color: "blue",
    icon: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
    keywords: [
      "1.价值主张 / Value Proposition", "2. 创始人第一性原理 / Founder's First Principles", "3. 愿景清晰度 / Vision Clarity", "4. 品牌信条 / Brand Creed", "5. 商业模式画布 / Business Model Canvas", "6. 战略天花板 / Strategic Ceiling", "7. 核心冲突识别 / Core Conflict Identification", "8. 品牌基因图谱 / Brand Gene Map", "9. 历史合法性 / Historical Legitimacy", "10. 终局思维 / End-game Thinking", 
      "11. 战略放弃清单 / Strategic Abandonment List", "12. 长期主义阈值 / Long-termism Threshold", "13. 组织使命 / Organizational Mission", "14. 文化母体寄生 / Cultural Matrix Parasitism", "15. 行业本质认知 / Perception of Industry Essence", "16. 路径依赖分析 / Path Dependency Analysis", "17. 战略机会窗 / Strategic Opportunity Window", "18. 品牌宗教化程度 / Brand Sacralization", "19. 伦理底线 / Ethical Bottom Line", "20. 增长飞轮模型 / Growth Flywheel Model",
      "21. 竞争优势持久性 / Sustainability of Competitive Advantage", "22. 资源配置优先序 / Resource Allocation Priority", "23. 市场进入壁垒 / Entry Barriers", "24. 退出战略 / Exit Strategy", "25. 品牌资产溢价 / Brand Equity Premium", "26. 战略柔性 / Strategic Flexibility", "27. 核心意识形态 / Core Ideology", "28. 社会契约 / Social Contract", "29. 利益相关者平衡 / Stakeholder Balance", "30. 范式转移能力 / Paradigm Shift Ability",
      "31. 品牌韧性 / Brand Resilience", "32. 蓝海识别力 / Blue Ocean Identification", "33. 顶层架构设计 / Top-level Architecture Design", "34. 商业生态位 / Business Niche", "35. 品牌遗产保护 / Brand Heritage Protection", "36. 扩张边界 / Expansion Boundaries", "37. 战略协同效应 / Strategic Synergy", "38. 机会成本评估 / Opportunity Cost Assessment", "39. 决策心智模型 / Decision Mental Models", "40. 叙事主权 / Narrative Sovereignty",
      "41. 符号资本 / Symbolic Capital", "42. 权力距离 / Power Distance", "43. 组织进化论 / Organizational Evolution", "44. 灰度决策力 / Gray-scale Decision Power", "45. 战略聚焦比 / Strategic Focus Ratio", "46. 市场敏感度 / Market Sensitivity", "47. 愿景变现率 / Vision Monetization Rate", "48. 品牌真诚度 / Brand Sincerity", "49. 认知溢价 / Cognitive Premium", "50. 跨代生存力 / Cross-generational Survivability"
    ]
  },
  {
    id: 2,
    title: "产品、研发与护城河 / Product, R&D & Moat",
    core: "拆解“交换价值”的物理实体 / Deconstructing the physical entity of 'Exchange Value'",
    color: "indigo",
    icon: "M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z",
    keywords: [
      "51. 产品矩阵 / Product Matrix", "52. 护城河宽度 / Moat Width", "53. 研发强度 / R&D Intensity", "54. 专利组合密度 / Patent Portfolio Density", "55. 迭代速率 / Iteration Speed", "56. 核心组件自研率 / Core Component Self-research Rate", "57. 转换成本 / Switching Costs", "58. 网络效应 / Network Effects", "59. 极品率/良品率 / Yield Rate", "60. 设计美学主权 / Design Aesthetic Sovereignty",
      "61. 工业设计独特性 / Industrial Design Uniqueness", "62. 交互体验细节 / Interaction Details", "63. 关键性能指标 / KPI", "64. 产品生命周期管理 / PLM", "65. 核心技术断层 / Core Tech Gap", "66. 材料科学突破 / Material Science Breakthrough", "67. 算法黑箱能力 / Algorithm Black Box Power", "68. 软硬件协同度 / HW/SW Synergy", "69. 模块化程度 / Modularity", "70. 接口开放性 / API Openness",
      "71. 用户参与设计 / Co-creation", "72. 极致单品逻辑 / Hero Product Logic", "73. SKU 盈亏平衡点 / SKU Break-even", "74. 产品可靠性 / Product Reliability", "75. 兼容性策略 / Compatibility Strategy", "76. 冗余设计 / Redundant Design", "77. 极简化能力 / Minimalism Ability", "78. 稀缺性塑造 / Scarcity Shaping", "79. 功能过剩评估 / Feature Overkill Assessment", "80. 解决方案完整性 / Solution Integrity",
      "81. 场景化匹配度 / Scenario Matching", "82. 用户反馈闭环 / Feedback Loop", "83. 敏捷开发模型 / Agile Dev Model", "84. 技术储备深度 / Tech Reserve Depth", "85. 行业标准控制力 / Industry Standard Control", "86. 工具属性 vs 玩具属性 / Tool vs Toy Attributes", "87. 情感设计 / Emotional Design", "88. 反脆弱设计 / Antifragile Design", "89. 生态兼容 / Eco-compatibility", "90. 知识产权防御 / IP Defense",
      "91. 盲测表现 / Blind Test Performance", "92. 工业 4.0 适应性 / Industry 4.0 Adaptability", "93. 绿色产品设计 / Green Design", "94. 维修性与寿命 / Repairability & Lifespan", "95. 二手保值率 / Resale Value", "96. 核心配方秘密 / Core Formula Secrecy", "97. 跨界技术迁移 / Cross-tech Migration", "98. 颠覆性创新潜能 / Disruptive Innovation Potential", "99. 易用性测试 / Usability Testing", "100. 独占体验 / Exclusive Experience"
    ]
  },
  {
    id: 3,
    title: "供应链、制造与精益运营 / Supply Chain, Manufacturing & Lean Ops",
    core: "解构价值创造的过程效率 / Deconstructing process efficiency of value creation",
    color: "teal",
    icon: "M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10 M13 16h4l4-4V8l-4-4h-4v12z",
    keywords: [
      "101. 成本结构拆解 / Cost Structure Breakdown", "102. 采购议价权 / Procurement Bargaining Power", "103. 柔性供应链 / Flexible Supply Chain", "104. 垂直整合度 / Vertical Integration", "105. 库存周转天数 / Days Inventory Outstanding", "106. 供应链金融 / Supply Chain Finance", "107. 供应商集中度 / Supplier Concentration", "108. 地理位置优势 / Geographical Advantage", "109. 履约成本 / Fulfillment Cost", "110. 碳足迹管理 / Carbon Footprint Management",
      "111. 精益生产 / Just-In-Time (JIT)", "112. 代工 vs 自建工厂 / OEM vs Own Factory", "113. 质量控制体系 / QA System", "114. 仓储自动化水平 / Warehouse Automation", "115. 原材料锁价能力 / Raw Material Price Locking", "116. 物流配送网络 / Logistics Network", "117. 分销成本 / Distribution Cost", "118. 关税敏感度 / Tariff Sensitivity", "119. 供应链可见性 / Supply Chain Visibility", "120. 应急供应预案 / Contingency Supply Plan",
      "121. 逆向物流处理 / Reverse Logistics", "122. 规模经济门槛 / Economies of Scale Threshold", "123. 范围经济效应 / Economies of Scope", "124. 边际成本曲线 / Marginal Cost Curve", "125. 固定成本分摊 / Fixed Cost Allocation", "126. 学习曲线效应 / Learning Curve Effect", "127. 设备折旧策略 / Depreciation Strategy", "128. 环保合规成本 / Environmental Compliance Cost", "129. 劳动力结构 / Labor Structure", "130. 数字化工厂 / Digital Factory",
      "131. 采购前置期 / Lead Time", "132. 动态定价支持 / Dynamic Pricing Support", "133. 生产批次效率 / Batch Production Efficiency", "134. 原材料替代力 / Material Substitutability", "135. 第三方物流依赖 / 3PL Dependency", "136. 冷链能力 / Cold Chain Capability", "137. 最后一公里效率 / Last-mile Efficiency", "138. 供应链透明度 / SC Transparency", "139. 产销率 / Production-Sales Ratio", "140. 损耗率控制 / Waste Rate Control",
      "141. 产能利用率 / Capacity Utilization", "142. 外包策略 / Outsourcing Strategy", "143. 协同过滤分拣 / Collaborative Sorting", "144. 全球化采购网络 / Global Sourcing Network", "145. 本地化生产比 / Localization Ratio", "146. 关键物料自给 / Key Material Self-sufficiency", "147. 供应链弹性 / Supply Chain Elasticity", "148. 集群效应 / Cluster Effect", "149. 智能补货算法 / AI Replenishment", "150. 工艺创新 / Process Innovation"
    ]
  },
  {
    id: 4,
    title: "增长、渠道与市场渗透 / Growth, Channel & Penetration",
    core: "研究“从工厂到用户”的惊险跳跃 / Studying the leap 'From Factory to User'",
    color: "emerald",
    icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",
    keywords: [
      "151. DTC 渗透率 / DTC Penetration", "152. 获客成本 / Customer Acquisition Cost (CAC)", "153. 用户终身价值 / Lifetime Value (LTV)", "154. 渠道利润分配 / Channel Profit Sharing", "155. 经销商管理系数 / Distributor Management Coef", "156. 货架占有率 / Shelf Space Share", "157. 全渠道协同 / Omni-channel Synergy", "158. 下沉市场战略 / Lower-tier Market Strategy", "159. 全球化扩张模型 / Global Expansion Model", "160. 复购率 / Retention Rate",
      "161. 流失率 / Churn Rate", "162. 裂变系数 / Viral Coefficient", "163. 流量来源占比 / Traffic Source Mix", "164. 搜索权重 / SEO/SEM Weight", "165. 社交媒体转化 / Social Media Conversion", "166. 私域流量池深度 / Private Traffic Depth", "167. 会员体系权益 / Loyalty Program Perks", "168. 促销活动频率 / Promotion Frequency", "169. 单店盈利模型 / Unit Economics (Store)", "170. 坪效与人效 / Sales per Sqm/Employee",
      "171. 市场占有率波动 / Market Share Volatility", "172. 推荐净值 / Net Promoter Score (NPS)", "173. 内容驱动增长 / Content-driven Growth", "174. 社区互动深度 / Community Engagement", "175. 地推能力 / Ground Ops Ability", "176. 跨界获客 / Cross-boundary Acquisition", "177. 触点管理 / Touchpoint Management", "178. 购买路径障碍 / Friction in Purchase Path", "179. 购物车放弃率 / Cart Abandonment Rate", "180. 季节性波动管理 / Seasonality Management",
      "181. 区域市场差异化 / Regional Differentiation", "182. 品牌进入成本 / Entry Cost", "183. 价格歧视策略 / Price Discrimination", "184. 捆绑销售效率 / Bundling Efficiency", "185. 二级市场价格控制 / Secondary Market Price Control", "186. 渠道冲突管理 / Channel Conflict Management", "187. 展示形象统一性 / Visual Identity Consistency", "188. 导购专业度 / Staff Professionalism", "189. 体验店转化 / Experience Store Conversion", "190. 自动补货系统 / Auto-replenishment",
      "191. 增长黑客手段 / Growth Hacking Tactics", "192. 用户画像精准度 / Persona Precision", "193. 短视频声量 / Short Video Share of Voice", "194. 直播带货权重 / Live Streaming Weight", "195. 关键意见领袖 / KOL", "196. 关键意见消费者 / KOC", "197. 搜索引擎占位 / SERP Positioning", "198. 移动端易用性 / Mobile Usability", "199. 市场响应速度 / Market Response Speed", "200. 留存曲线 / Retention Curve"
    ]
  },
  {
    id: 5,
    title: "心智、符号与消费者心理 / Mindshare, Symbols & Psychology",
    core: "解构大脑对品牌的条件反射 / Deconstructing the brain's conditioned reflex to the brand",
    color: "purple",
    icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.989-2.386l-.548-.547z",
    keywords: [
      "201. 视觉锤 / Visual Hammer", "202. 语言钉 / Verbal Nail", "203. 符号系统 / Symbol System", "204. 品牌人格 / Brand Personality", "205. 阶层标签 / Social Class Label", "206. 身份认同感 / Identity Recognition", "207. 情绪补偿 / Emotional Compensation", "208. 稀缺性心理 / Scarcity Psychology", "209. 仪式感设计 / Ritual Design", "210. 品牌忠诚度 / Brand Loyalty",
      "211. 品牌联想 / Brand Association", "212. 潜意识激发 / Subconscious Activation", "213. 峰终定律 / Peak-end Rule", "214. 社交货币价值 / Social Currency Value", "215. 品牌故事线 / Brand Storyline", "216. 审美主权 / Aesthetic Sovereignty", "217. 跨文化适应力 / Cross-cultural Adaptability", "218. 用户归属感 / Sense of Belonging", "219. 品牌溢价系数 / Brand Premium Coef", "220. 心理账户归属 / Mental Accounting",
      "221. 成瘾性机制 / Addictive Mechanisms", "222. 复古/未来感定位 / Retro/Futuristic Positioning", "223. 认知偏差利用 / Cognitive Bias Utilization", "224. 品牌真诚度 / Brand Authenticity", "225. 品牌权威性 / Brand Authority", "226. 用户怀旧情绪 / User Nostalgia", "227. 焦虑缓解力 / Anxiety Relief Power", "228. 多巴胺触发 / Dopamine Trigger", "229. 品牌触觉/嗅觉 / Haptic/Olfactory Branding", "230. 包装设计的心理暗示 / Packaging Psychology",
      "231. 价格锚点 / Price Anchor", "232. 奢侈品门槛 / Luxury Threshold", "233. 大众流行度 / Mass Popularity", "234. 文化母体寄生 / Cultural Matrix Parasite", "235. 品牌排他性 / Brand Exclusivity", "236. 反向营销策略 / Reverse Marketing", "237. 用户自尊满足 / Self-esteem Fulfillment", "238. 品牌安全性 / Brand Safety", "239. 个性化表达 / Personalized Expression", "240. 品牌图腾 / Brand Totem",
      "241. 社区共鸣 / Community Resonance", "242. 意见领袖背书 / Influencer Endorsement", "243. 文化冲突处理 / Cultural Conflict Management", "244. 宗教化崇拜 / Sacral Worship", "245. 无形资产 / Intangible Assets", "246. 品牌半衰期 / Brand Half-life", "247. 知名度 vs 美誉度 / Awareness vs Reputation", "248. 品牌纠偏力 / Brand Correction Power", "249. 品牌延伸力 / Brand Extension Power", "250. 心智份额 / Mindshare"
    ]
  },
  {
    id: 6,
    title: "数字化、AI 与技术资产 / Digital, AI & Tech Assets",
    core: "解构品牌的“数字灵魂” / Deconstructing the brand's 'Digital Soul'",
    color: "cyan",
    icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4",
    keywords: [
      "251. 用户数据中台 / CDP", "252. 数据治理模型 / Data Governance", "253. 算法分发效率 / Algorithmic Efficiency", "254. 机器学习模型精度 / ML Model Precision", "255. 技术架构可扩展性 / Scalability", "256. 云原生适配度 / Cloud Native", "257. 网络安全等级 / Cybersecurity Level", "258. API 生态开放度 / API Ecosystem", "259. 自动化营销 / MA", "260. 实时数据反馈链 / Real-time Feedback",
      "261. AI 替代人工率 / AI Replacement Rate", "262. 数字孪生应用 / Digital Twin", "263. 边缘计算布局 / Edge Computing", "264. 生成式 AI 内容产出 / GenAI Content", "265. 数字化用户体验 / DX", "266. 低代码平台普及 / Low-code Adoption", "267. 遗留系统转换成本 / Legacy System Cost", "268. 预测性维护算法 / Predictive Maintenance", "269. 用户画像动态更新 / Dynamic Personas", "270. 数字化人才储备 / Digital Talent Pool",
      "271. 区块链溯源 / Blockchain Traceability", "272. 虚拟资产/NFT 布局 / Virtual Assets/NFT", "273. 增强现实购物 / AR Shopping", "274. 语义分析系统 / Semantic Analysis", "275. 数字化触点一致性 / Consistency", "276. IT 投入产出比 / IT ROI", "277. 系统宕机风险 / Downtime Risk", "278. 埋点数据质量 / Tracking Data Quality", "279. 跨平台数据打通 / Cross-platform Integration", "280. 隐私保护计算 / Privacy Computing",
      "281. 技术债务规模 / Tech Debt", "282. 专有软件资产 / Proprietary Software", "283. 敏捷开发冲刺频率 / Agile Sprint Freq", "284. 数字化供应网络 / Digital Supply Network", "285. 物联网设备连接数 / IoT Connections", "286. 智慧门店互动率 / Smart Store Engagement", "287. 云端协同效率 / Cloud Collaboration", "288. 数据驱动决策比 / Data-driven Decision Ratio", "289. 自动化测试覆盖率 / Test Coverage", "290. 数字版权管理 / DRM",
      "291. 流量黑盒解析 / Traffic Box Analysis", "292. 算法公平性审查 / Algorithmic Fairness", "293. 用户行为漏斗 / Behavior Funnel", "294. 技术生态参与度 / Ecosystem Participation", "295. 开源贡献/影响力 / Open Source Impact", "296. 内部工具化率 / Internal Tooling Ratio", "297. 数字化转型成熟度 / Transformation Maturity", "298. 异地灾备能力 / Disaster Recovery", "299. 前沿技术雷达 / Tech Radar", "300. 技术专利转化率 / Patent Conversion Rate"
    ]
  },
  {
    id: 7,
    title: "组织管理、文化与人才 / Org Management, Culture & Talent",
    core: "拆解驱动品牌的“生物能” / Deconstructing the 'Biological Energy' driving the brand",
    color: "amber",
    icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
    keywords: [
      "301. 组织架构扁平度 / Org Flatness", "302. 管理跨度 / Span of Control", "303. 核心管理层背景 / Exec Team Background", "304. 人才流失率 / Turnover", "305. 股权激励覆盖面 / Equity Incentive Coverage", "306. 绩效考核逻辑 / KPI/OKR Logic", "307. 组织文化一致性 / Culture Alignment", "308. 内部信息透明度 / Internal Transparency", "309. 跨部门协同摩擦 / Cross-dept Friction", "310. 阿米巴/小团队制 / Amoeba Management",
      "311. 人才招聘吸引力 / Employer Branding", "312. 培训预算占比 / Training Budget Ratio", "313. 员工净推荐值 / eNPS", "314. 内部晋升比例 / Internal Promotion Rate", "315. 权力放行度 / Empowerment Degree", "316. 决策冗余度 / Decision Redundancy", "317. 冲突管理机制 / Conflict Management", "318. 创新容错率 / Innovation Tolerance", "319. 企业价值观践行 / Value Implementation", "320. 雇主品牌影响力 / Employer Impact",
      "321. 员工多元化程度 / Diversity", "322. 远程办公适应力 / Remote Work Adaptability", "323. 内部知识库深度 / Knowledge Base Depth", "324. 继任者计划 / Succession Planning", "325. 政治内耗指数 / Internal Politics Index", "326. 专家与管理双通道 / Dual Career Path", "327. 组织学习速度 / Org Learning Speed", "328. 核心技术团队工龄 / Tech Team Seniority", "329. 战略共识达成度 / Strategic Consensus", "330. 组织变革频率 / Change Frequency",
      "331. 中层执行力 / Middle Mgmt Execution", "332. 跨国团队管理能力 / Global Team Mgmt", "333. 影子内阁/智囊团 / Brain Trust", "334. 员工归属感机制 / Sense of Belonging", "335. 劳资关系稳定性 / Labor Relations Stability", "336. 内部赛马机制 / Internal Competition", "337. 敏捷小组比例 / Agile Team Ratio", "338. 文化稀释风险 / Culture Dilution Risk", "339. 职场环境健康度 / Workplace Health", "340. 团队士气监测 / Morale Monitoring",
      "341. 创始人接班压力 / Founder Succession", "342. 部门利益墙深度 / Silo Depth", "343. 奖金包分配逻辑 / Bonus Allocation", "344. 招聘渠道转化 / Hiring Conversion", "345. 员工离职访谈价值 / Exit Interview Value", "346. 柔性工作制 / Flexible Working", "347. 内部创业孵化 / Internal Incubator", "348. 危机时刻凝聚力 / Cohesion in Crisis", "349. 非正式组织影响力 / Informal Org Influence", "350. 组织抗压极限 / Org Stress Limit"
    ]
  },
  {
    id: 8,
    title: "财务、资本与金融运营 / Finance, Capital & Ops",
    core: "品牌在资本市场的“计分板” / The brand's 'scoreboard' in capital markets",
    color: "rose",
    icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.407 2.67 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.407-2.67-1M12 16v1m4-12H8a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V6a2 2 0 00-2-2z",
    keywords: [
      "351. 营收增长率 / Revenue Growth", "352. 毛利率趋势 / Gross Margin Trend", "353. 净利润率水平 / Net Margin", "354. 经营性现金流 / Operating Cash Flow", "355. 自由现金流 / FCF", "356. 净资产收益率 / ROE", "357. 投入资本回报率 / ROIC", "358. 资产负债率 / D/E Ratio", "359. 债务利息覆盖率 / Interest Coverage", "360. 现金转化周期 / CCC",
      "361. 资本支出占营收比 / CAPEX/Sales", "362. 研发费用化 vs 资本化 / R&D Exp vs Cap", "363. 坏账准备充足度 / Bad Debt Provision", "364. 商誉减值风险 / Goodwill Impairment", "365. 融资成本 / WACC", "366. 投资者构成 / Investor Mix", "367. 股票回购力度 / Share Buyback", "368. 分红策略 / Dividend Strategy", "369. 估值溢价倍数 / Valuation Premium", "370. 市盈率/市销率 / PE/PS",
      "371. 资本中台运营力 / Capital Middle-office", "372. 地缘金融敞口 / Geofinancial Exposure", "373. 税收筹划合法性 / Tax Planning", "374. 汇率风险对冲 / FX Hedging", "375. 关联交易透明度 / Related Party Transparency", "376. 影子资产评估 / Shadow Asset Evaluation", "377. 财务杠杆安全性 / Financial Leverage Safety", "378. 审计意见历史 / Audit History", "379. 投资组合收益 / Portfolio Returns", "380. 并购溢价率 / M&A Premium",
      "381. 独角兽指数 / Unicorn Index", "382. 资金池管理效率 / Cash Pooling Efficiency", "383. 营收质量 / Revenue Quality", "384. 获客成本回收期 / Payback Period", "385. 应收账款周转 / AR Turnover", "386. 运营资本需求 / Working Capital Needs", "387. 股东协议约束力 / Shareholder Agreement", "388. 上市/退出路径 / IPO/Exit Path", "389. 财务造假防御系统 / Fraud Defense", "390. 资本开支回报预测 / CAPEX ROI Forecast",
      "391. 单用户边际贡献 / Marginal Contribution", "392. 盈亏平衡点位置 / Break-even Point", "393. 财务预警指标 / Early Warning Indicators", "394. 金融化获利能力 / Financialized Profit", "395. 员工人均创收 / Revenue per Head", "396. 资本杠杆乘数 / Capital Multiplier", "397. 融资渠道多元化 / Funding Diversity", "398. 投资者关系处理 / IR", "399. 财务透明度得分 / Transparency Score", "400. 资产流动性储备 / Liquidity Reserve"
    ]
  },
  {
    id: 9,
    title: "法律、合规与风险管理 / Law, Compliance & Risk",
    core: "品牌的“盾牌”与生存红线 / The brand's 'Shield' and survival red-lines",
    color: "slate",
    icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
    keywords: [
      "401. 商标保护网密度 / Trademark Network", "402. 全球专利布局能力 / Global Patent Layout", "403. 反垄断审查风险 / Antitrust Risk", "404. 劳动法合规性 / Labor Law Compliance", "405. 消费者保护协议 / Consumer Protection", "406. 数据主权与合规 / Data Sovereignty", "407. 诉讼历史记录 / Litigation History", "408. 合同管理系统精度 / Contract Mgmt Precision", "409. 关联方利益回避 / Conflict of Interest", "410. 反贿赂合规 / FCPA/Anti-bribery",
      "411. 供应链劳工标准 / Supply Chain Labor Standards", "412. 知识产权维权效率 / IP Enforcement", "413.虚假广告监管风险 / False Advertising Risk", "414. 产品责任险覆盖 / Product Liability Insurance", "415. 进出口限制合规 / Export/Import Compliance", "416. 行业准入牌照 / Industry Licenses", "417. 商业秘密保护机制 / Trade Secret Protection", "418. 法务成本占比 / Legal Cost Ratio", "419. 监管沟通能力 / Regulatory Communication", "420. 网络安全法遵循 / Cybersecurity Law",
      "421. 知识产权交叉授权 / Cross-licensing", "422. 特许经营法律风险 / Franchising Legal Risk", "423. 环境法规遵循 / ESG Regulation", "424. 反恶意收购机制 / Anti-takeover Mechanisms", "425. 品牌更名风险 / Rebranding Risk", "426. 域名资产保护 / Domain Name Protection", "427. 内容审核机制 / Content Moderation", "428. 属地化合规管理 / Localized Compliance", "429. 合规官架构 / Compliance Officer Org", "430. 道德审计频率 / Ethical Audit Frequency",
      "431. 专利池参与度 / Patent Pool Participation", "432. 格式合同透明度 / Standard Contract Transparency", "433. 消费者集体诉讼预防 / Class Action Prevention", "434. 贸易制裁名单扫描 / Sanction List Scanning", "435. 税务合规信誉 / Tax Compliance Rating", "436. 个人隐私处理协议 / Privacy Agreements", "437. 争议解决条款 / Dispute Resolution", "438. 知识产权质押能力 / IP Pledging", "439. 专利失效预警 / Patent Expiry Warning", "440. 核心人才竞业协议 / Non-compete Agreements",
      "441. 资本外流合规 / Capital Outflow Compliance", "442. 第三方尽职调查 / Third-party Due Diligence", "443. 企业社会责任报告 / CSR Report", "444. 公关危机法律介入 / Legal Crisis Response", "445. 知识产权溢价保护 / IP Premium Protection", "446. 广告法动态更新 / Advertising Law Updates", "447. 分销商法律约束 / Distributor Legal Constraints", "448. 技术出海合规 / Tech Export Compliance", "449. 专利运营能力 / Patent Monetization", "450. 法律科技化应用 / LegalTech Adoption"
    ]
  },
  {
    id: 10,
    title: "生态博弈、宏观周期与未来演化 / Ecosystem, Macro Cycles & Evolution",
    core: "品牌在时空长河中的相对位移 / Relative displacement of the brand in time and space",
    color: "violet",
    icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 002 2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    keywords: [
      "451. 行业标准制定权 / Standard Setting Power", "452. 生态伙伴依赖度 / Ecosystem Dependency", "453. 周期敏感性 / Cycle Sensitivity", "454. 消费降级/升级抵抗力 / Consumption Resilience", "455. 人口结构适配度 / Demographic Matching", "456. 技术替代威胁 / Tech Substitution Threat", "457. 宏观政策导向适配 / Macro Policy Alignment", "458. 全球化 vs 本地化冲突 / Glocalization Conflict", "459. 社会思潮契合度 / Social Trend Alignment", "460. 碳中和时间表 / Carbon Neutrality Timeline",
      "461. 行业马太效应强度 / Matthew Effect Strength", "462. 跨界打击防御力 / Cross-boundary Defense", "463. 第二曲线成熟度 / Second Curve Maturity", "464. 核心物料断供预警 / Supply Chain Disruption", "465. 品牌衰老速度 / Brand Aging Speed", "466. 消费者代际更替管理 / Intergenerational Mgmt", "467. 地缘政治弹性 / Geopolitical Resilience", "468. 资本运作周期 / Capital Operation Cycle", "469. 公众情绪管理能力 / Public Sentiment Mgmt", "470. 媒体关系矩阵 / Media Relations Matrix",
      "471. 智库影响力 / Think-tank Influence", "472. 行业标准委员会席位 / Industry Committee Seats", "473. 区域性保护主义应对 / Protectionism Response", "474. 能源成本波动压力 / Energy Cost Pressure", "475. 反脆弱生态系统 / Antifragile Ecosystem", "476. 生态溢出效应 / Spillover Effects", "477. 未来场景想象力 / Future Scenario Imagination", "478. 颠覆性创新探测 / Disruptive Discovery", "479. 品牌跨代传承 / Intergenerational Heritage", "480. 行业周期性库存 / Cyclical Inventory",
      "481. 市场碎片化应对 / Fragmentation Response", "482. 极右/极左社会思潮防御 / Social Ideology Defense", "483. 城市化红利衰减 / Urbanization Dividend Decline", "484. 零工经济影响 / Gig Economy Impact", "485. 自动化对岗位的替代 / Automation Impact", "486. 全球贸易协定受益 / Trade Agreement Benefits", "487. 基础设施依赖度 / Infrastructure Dependency", "488. 环境巨变预案 / Extreme Env Planning", "489. 行业整合者角色 / Industry Consolidator Role", "490. 平台化转型能力 / Platformization Ability",
      "491. 标准开源策略 / Standard Open-source Strategy", "492. 文化出海渗透力 / Cultural Export Penetration", "493. 核心受众迁移率 / Core Audience Migration", "494. 社交媒体变迁抗性 / Platform Evolution Resistance", "495. 品牌哲学普世性 / Philosophical Universality", "496. 宏观通胀转嫁能力 / Inflation Pass-through", "497. 核心供应商不可替代性 / Supplier Criticality", "498. 行业护城河迁移 / Moat Migration", "499. 未知风险监测 / Black Swan Monitoring", "500. 品牌永续生存力 / Brand Perpetuity"
    ]
  }
];
