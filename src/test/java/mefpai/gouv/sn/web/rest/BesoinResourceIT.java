package mefpai.gouv.sn.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import mefpai.gouv.sn.IntegrationTest;
import mefpai.gouv.sn.domain.Besoin;
import mefpai.gouv.sn.domain.enumeration.TypeB;
import mefpai.gouv.sn.repository.BesoinRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

// import org.springframework.util.Base64Utils;

/**
 * Integration tests for the {@link BesoinResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class BesoinResourceIT {

    private static final TypeB DEFAULT_TYPE = TypeB.PERSONNEL_APPOINT;
    private static final TypeB UPDATED_TYPE = TypeB.PERSONNEL_ADMINISTRATIF;

    private static final String DEFAULT_AUTRE_BESOIN = "AAAAAAAAAA";
    private static final String UPDATED_AUTRE_BESOIN = "BBBBBBBBBB";

    private static final String DEFAULT_DESIGNATION = "AAAAAAAAAA";
    private static final String UPDATED_DESIGNATION = "BBBBBBBBBB";

    private static final String DEFAULT_ETAT_ACTUEL = "AAAAAAAAAA";
    private static final String UPDATED_ETAT_ACTUEL = "BBBBBBBBBB";

    private static final String DEFAULT_INTERVENTION_SOUHAITEE = "AAAAAAAAAA";
    private static final String UPDATED_INTERVENTION_SOUHAITEE = "BBBBBBBBBB";

    private static final String DEFAULT_JUSTIFICATION = "AAAAAAAAAA";
    private static final String UPDATED_JUSTIFICATION = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/besoins";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private BesoinRepository besoinRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restBesoinMockMvc;

    private Besoin besoin;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Besoin createEntity(EntityManager em) {
        Besoin besoin = new Besoin()
            .type(DEFAULT_TYPE)
            .autreBesoin(DEFAULT_AUTRE_BESOIN)
            .designation(DEFAULT_DESIGNATION)
            .etatActuel(DEFAULT_ETAT_ACTUEL)
            .interventionSouhaitee(DEFAULT_INTERVENTION_SOUHAITEE)
            .justification(DEFAULT_JUSTIFICATION);
        return besoin;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Besoin createUpdatedEntity(EntityManager em) {
        Besoin besoin = new Besoin()
            .type(UPDATED_TYPE)
            .autreBesoin(UPDATED_AUTRE_BESOIN)
            .designation(UPDATED_DESIGNATION)
            .etatActuel(UPDATED_ETAT_ACTUEL)
            .interventionSouhaitee(UPDATED_INTERVENTION_SOUHAITEE)
            .justification(UPDATED_JUSTIFICATION);
        return besoin;
    }

    @BeforeEach
    public void initTest() {
        besoin = createEntity(em);
    }

    @Test
    @Transactional
    void createBesoin() throws Exception {
        int databaseSizeBeforeCreate = besoinRepository.findAll().size();
        // Create the Besoin
        restBesoinMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(besoin)))
            .andExpect(status().isCreated());

        // Validate the Besoin in the database
        List<Besoin> besoinList = besoinRepository.findAll();
        assertThat(besoinList).hasSize(databaseSizeBeforeCreate + 1);
        Besoin testBesoin = besoinList.get(besoinList.size() - 1);
        assertThat(testBesoin.getType()).isEqualTo(DEFAULT_TYPE);
        assertThat(testBesoin.getAutreBesoin()).isEqualTo(DEFAULT_AUTRE_BESOIN);
        assertThat(testBesoin.getDesignation()).isEqualTo(DEFAULT_DESIGNATION);
        assertThat(testBesoin.getEtatActuel()).isEqualTo(DEFAULT_ETAT_ACTUEL);
        assertThat(testBesoin.getInterventionSouhaitee()).isEqualTo(DEFAULT_INTERVENTION_SOUHAITEE);
        assertThat(testBesoin.getJustification()).isEqualTo(DEFAULT_JUSTIFICATION);
    }

    @Test
    @Transactional
    void createBesoinWithExistingId() throws Exception {
        // Create the Besoin with an existing ID
        besoin.setId(1L);

        int databaseSizeBeforeCreate = besoinRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restBesoinMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(besoin)))
            .andExpect(status().isBadRequest());

        // Validate the Besoin in the database
        List<Besoin> besoinList = besoinRepository.findAll();
        assertThat(besoinList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkTypeIsRequired() throws Exception {
        int databaseSizeBeforeTest = besoinRepository.findAll().size();
        // set the field null
        besoin.setType(null);

        // Create the Besoin, which fails.

        restBesoinMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(besoin)))
            .andExpect(status().isBadRequest());

        List<Besoin> besoinList = besoinRepository.findAll();
        assertThat(besoinList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllBesoins() throws Exception {
        // Initialize the database
        besoinRepository.saveAndFlush(besoin);

        // Get all the besoinList
        restBesoinMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(besoin.getId().intValue())))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE.toString())))
            .andExpect(jsonPath("$.[*].autreBesoin").value(hasItem(DEFAULT_AUTRE_BESOIN)))
            .andExpect(jsonPath("$.[*].designation").value(hasItem(DEFAULT_DESIGNATION.toString())))
            .andExpect(jsonPath("$.[*].etatActuel").value(hasItem(DEFAULT_ETAT_ACTUEL)))
            .andExpect(jsonPath("$.[*].interventionSouhaitee").value(hasItem(DEFAULT_INTERVENTION_SOUHAITEE.toString())))
            .andExpect(jsonPath("$.[*].justification").value(hasItem(DEFAULT_JUSTIFICATION.toString())));
    }

    @Test
    @Transactional
    void getBesoin() throws Exception {
        // Initialize the database
        besoinRepository.saveAndFlush(besoin);

        // Get the besoin
        restBesoinMockMvc
            .perform(get(ENTITY_API_URL_ID, besoin.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(besoin.getId().intValue()))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE.toString()))
            .andExpect(jsonPath("$.autreBesoin").value(DEFAULT_AUTRE_BESOIN))
            .andExpect(jsonPath("$.designation").value(DEFAULT_DESIGNATION.toString()))
            .andExpect(jsonPath("$.etatActuel").value(DEFAULT_ETAT_ACTUEL))
            .andExpect(jsonPath("$.interventionSouhaitee").value(DEFAULT_INTERVENTION_SOUHAITEE.toString()))
            .andExpect(jsonPath("$.justification").value(DEFAULT_JUSTIFICATION.toString()));
    }

    @Test
    @Transactional
    void getNonExistingBesoin() throws Exception {
        // Get the besoin
        restBesoinMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewBesoin() throws Exception {
        // Initialize the database
        besoinRepository.saveAndFlush(besoin);

        int databaseSizeBeforeUpdate = besoinRepository.findAll().size();

        // Update the besoin
        Besoin updatedBesoin = besoinRepository.findById(besoin.getId()).get();
        // Disconnect from session so that the updates on updatedBesoin are not directly saved in db
        em.detach(updatedBesoin);
        updatedBesoin
            .type(UPDATED_TYPE)
            .autreBesoin(UPDATED_AUTRE_BESOIN)
            .designation(UPDATED_DESIGNATION)
            .etatActuel(UPDATED_ETAT_ACTUEL)
            .interventionSouhaitee(UPDATED_INTERVENTION_SOUHAITEE)
            .justification(UPDATED_JUSTIFICATION);

        restBesoinMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedBesoin.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedBesoin))
            )
            .andExpect(status().isOk());

        // Validate the Besoin in the database
        List<Besoin> besoinList = besoinRepository.findAll();
        assertThat(besoinList).hasSize(databaseSizeBeforeUpdate);
        Besoin testBesoin = besoinList.get(besoinList.size() - 1);
        assertThat(testBesoin.getType()).isEqualTo(UPDATED_TYPE);
        assertThat(testBesoin.getAutreBesoin()).isEqualTo(UPDATED_AUTRE_BESOIN);
        assertThat(testBesoin.getDesignation()).isEqualTo(UPDATED_DESIGNATION);
        assertThat(testBesoin.getEtatActuel()).isEqualTo(UPDATED_ETAT_ACTUEL);
        assertThat(testBesoin.getInterventionSouhaitee()).isEqualTo(UPDATED_INTERVENTION_SOUHAITEE);
        assertThat(testBesoin.getJustification()).isEqualTo(UPDATED_JUSTIFICATION);
    }

    @Test
    @Transactional
    void putNonExistingBesoin() throws Exception {
        int databaseSizeBeforeUpdate = besoinRepository.findAll().size();
        besoin.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restBesoinMockMvc
            .perform(
                put(ENTITY_API_URL_ID, besoin.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(besoin))
            )
            .andExpect(status().isBadRequest());

        // Validate the Besoin in the database
        List<Besoin> besoinList = besoinRepository.findAll();
        assertThat(besoinList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchBesoin() throws Exception {
        int databaseSizeBeforeUpdate = besoinRepository.findAll().size();
        besoin.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restBesoinMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(besoin))
            )
            .andExpect(status().isBadRequest());

        // Validate the Besoin in the database
        List<Besoin> besoinList = besoinRepository.findAll();
        assertThat(besoinList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamBesoin() throws Exception {
        int databaseSizeBeforeUpdate = besoinRepository.findAll().size();
        besoin.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restBesoinMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(besoin)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Besoin in the database
        List<Besoin> besoinList = besoinRepository.findAll();
        assertThat(besoinList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateBesoinWithPatch() throws Exception {
        // Initialize the database
        besoinRepository.saveAndFlush(besoin);

        int databaseSizeBeforeUpdate = besoinRepository.findAll().size();

        // Update the besoin using partial update
        Besoin partialUpdatedBesoin = new Besoin();
        partialUpdatedBesoin.setId(besoin.getId());

        partialUpdatedBesoin.designation(UPDATED_DESIGNATION).justification(UPDATED_JUSTIFICATION);

        restBesoinMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedBesoin.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedBesoin))
            )
            .andExpect(status().isOk());

        // Validate the Besoin in the database
        List<Besoin> besoinList = besoinRepository.findAll();
        assertThat(besoinList).hasSize(databaseSizeBeforeUpdate);
        Besoin testBesoin = besoinList.get(besoinList.size() - 1);
        assertThat(testBesoin.getType()).isEqualTo(DEFAULT_TYPE);
        assertThat(testBesoin.getAutreBesoin()).isEqualTo(DEFAULT_AUTRE_BESOIN);
        assertThat(testBesoin.getDesignation()).isEqualTo(UPDATED_DESIGNATION);
        assertThat(testBesoin.getEtatActuel()).isEqualTo(DEFAULT_ETAT_ACTUEL);
        assertThat(testBesoin.getInterventionSouhaitee()).isEqualTo(DEFAULT_INTERVENTION_SOUHAITEE);
        assertThat(testBesoin.getJustification()).isEqualTo(UPDATED_JUSTIFICATION);
    }

    @Test
    @Transactional
    void fullUpdateBesoinWithPatch() throws Exception {
        // Initialize the database
        besoinRepository.saveAndFlush(besoin);

        int databaseSizeBeforeUpdate = besoinRepository.findAll().size();

        // Update the besoin using partial update
        Besoin partialUpdatedBesoin = new Besoin();
        partialUpdatedBesoin.setId(besoin.getId());

        partialUpdatedBesoin
            .type(UPDATED_TYPE)
            .autreBesoin(UPDATED_AUTRE_BESOIN)
            .designation(UPDATED_DESIGNATION)
            .etatActuel(UPDATED_ETAT_ACTUEL)
            .interventionSouhaitee(UPDATED_INTERVENTION_SOUHAITEE)
            .justification(UPDATED_JUSTIFICATION);

        restBesoinMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedBesoin.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedBesoin))
            )
            .andExpect(status().isOk());

        // Validate the Besoin in the database
        List<Besoin> besoinList = besoinRepository.findAll();
        assertThat(besoinList).hasSize(databaseSizeBeforeUpdate);
        Besoin testBesoin = besoinList.get(besoinList.size() - 1);
        assertThat(testBesoin.getType()).isEqualTo(UPDATED_TYPE);
        assertThat(testBesoin.getAutreBesoin()).isEqualTo(UPDATED_AUTRE_BESOIN);
        assertThat(testBesoin.getDesignation()).isEqualTo(UPDATED_DESIGNATION);
        assertThat(testBesoin.getEtatActuel()).isEqualTo(UPDATED_ETAT_ACTUEL);
        assertThat(testBesoin.getInterventionSouhaitee()).isEqualTo(UPDATED_INTERVENTION_SOUHAITEE);
        assertThat(testBesoin.getJustification()).isEqualTo(UPDATED_JUSTIFICATION);
    }

    @Test
    @Transactional
    void patchNonExistingBesoin() throws Exception {
        int databaseSizeBeforeUpdate = besoinRepository.findAll().size();
        besoin.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restBesoinMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, besoin.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(besoin))
            )
            .andExpect(status().isBadRequest());

        // Validate the Besoin in the database
        List<Besoin> besoinList = besoinRepository.findAll();
        assertThat(besoinList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchBesoin() throws Exception {
        int databaseSizeBeforeUpdate = besoinRepository.findAll().size();
        besoin.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restBesoinMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(besoin))
            )
            .andExpect(status().isBadRequest());

        // Validate the Besoin in the database
        List<Besoin> besoinList = besoinRepository.findAll();
        assertThat(besoinList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamBesoin() throws Exception {
        int databaseSizeBeforeUpdate = besoinRepository.findAll().size();
        besoin.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restBesoinMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(besoin)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Besoin in the database
        List<Besoin> besoinList = besoinRepository.findAll();
        assertThat(besoinList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteBesoin() throws Exception {
        // Initialize the database
        besoinRepository.saveAndFlush(besoin);

        int databaseSizeBeforeDelete = besoinRepository.findAll().size();

        // Delete the besoin
        restBesoinMockMvc
            .perform(delete(ENTITY_API_URL_ID, besoin.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Besoin> besoinList = besoinRepository.findAll();
        assertThat(besoinList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
