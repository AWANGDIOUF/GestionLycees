package mefpai.gouv.sn.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import mefpai.gouv.sn.domain.NiveauxEtudes;
import mefpai.gouv.sn.repository.NiveauxEtudesRepository;
import mefpai.gouv.sn.security.SecurityUtils;
import mefpai.gouv.sn.service.NiveauxEtudesService;
import mefpai.gouv.sn.web.rest.errors.BadRequestAlertException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
// import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link mefpai.gouv.sn.domain.NiveauxEtudes}.
 */
@RestController
@RequestMapping("/api")
public class NiveauxEtudesResource {

    private final Logger log = LoggerFactory.getLogger(NiveauxEtudesResource.class);

    private static final String ENTITY_NAME = "niveauxEtudes";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final NiveauxEtudesService niveauxEtudesService;

    private final NiveauxEtudesRepository niveauxEtudesRepository;

    public NiveauxEtudesResource(NiveauxEtudesService niveauxEtudesService, NiveauxEtudesRepository niveauxEtudesRepository) {
        this.niveauxEtudesService = niveauxEtudesService;
        this.niveauxEtudesRepository = niveauxEtudesRepository;
    }

    /**
     * {@code POST  /niveaux-etudes} : Create a new niveauxEtudes.
     *
     * @param niveauxEtudes the niveauxEtudes to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new niveauxEtudes, or with status {@code 400 (Bad Request)} if the niveauxEtudes has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/niveaux-etudes")
    public ResponseEntity<NiveauxEtudes> createNiveauxEtudes(@Valid @RequestBody NiveauxEtudes niveauxEtudes) throws URISyntaxException {
        log.debug("REST request to save NiveauxEtudes : {}", niveauxEtudes);
        if (niveauxEtudes.getId() != null) {
            throw new BadRequestAlertException("A new niveauxEtudes cannot already have an ID", ENTITY_NAME, "idexists");
        }
        NiveauxEtudes result = niveauxEtudesService.save(niveauxEtudes);
        return ResponseEntity
            .created(new URI("/api/niveaux-etudes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /niveaux-etudes/:id} : Updates an existing niveauxEtudes.
     *
     * @param id the id of the niveauxEtudes to save.
     * @param niveauxEtudes the niveauxEtudes to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated niveauxEtudes,
     * or with status {@code 400 (Bad Request)} if the niveauxEtudes is not valid,
     * or with status {@code 500 (Internal Server Error)} if the niveauxEtudes couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/niveaux-etudes/{id}")
    public ResponseEntity<NiveauxEtudes> updateNiveauxEtudes(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody NiveauxEtudes niveauxEtudes
    ) throws URISyntaxException {
        log.debug("REST request to update NiveauxEtudes : {}, {}", id, niveauxEtudes);
        if (niveauxEtudes.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, niveauxEtudes.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!niveauxEtudesRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        NiveauxEtudes result = niveauxEtudesService.save(niveauxEtudes);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, niveauxEtudes.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /niveaux-etudes/:id} : Partial updates given fields of an existing niveauxEtudes, field will ignore if it is null
     *
     * @param id the id of the niveauxEtudes to save.
     * @param niveauxEtudes the niveauxEtudes to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated niveauxEtudes,
     * or with status {@code 400 (Bad Request)} if the niveauxEtudes is not valid,
     * or with status {@code 404 (Not Found)} if the niveauxEtudes is not found,
     * or with status {@code 500 (Internal Server Error)} if the niveauxEtudes couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/niveaux-etudes/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<NiveauxEtudes> partialUpdateNiveauxEtudes(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody NiveauxEtudes niveauxEtudes
    ) throws URISyntaxException {
        log.debug("REST request to partial update NiveauxEtudes partially : {}, {}", id, niveauxEtudes);
        if (niveauxEtudes.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, niveauxEtudes.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!niveauxEtudesRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<NiveauxEtudes> result = niveauxEtudesService.partialUpdate(niveauxEtudes);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, niveauxEtudes.getId().toString())
        );
    }

    /**
     * {@code GET  /niveaux-etudes} : get all the niveauxEtudes.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of niveauxEtudes in body.
     */
    @GetMapping("/niveaux-etudes")
    public ResponseEntity<List<NiveauxEtudes>> getAllNiveauxEtudes(Pageable pageable) {
        log.debug("REST request to get a page of NiveauxEtudes");
        if (SecurityUtils.hasCurrentUserThisAuthority("ROLE_ADMIN")) {
            Page<NiveauxEtudes> page = niveauxEtudesService.findAll(pageable);
            HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
            return ResponseEntity.ok().headers(headers).body(page.getContent());
        }
        return ResponseEntity
            .ok()
            .headers(
                PaginationUtil.generatePaginationHttpHeaders(
                    ServletUriComponentsBuilder.fromCurrentRequest(),
                    (niveauxEtudesService.findByUserIsCurrentUser(pageable))
                )
            )
            .body((niveauxEtudesRepository.findByUserIsCurrentUser(pageable)).getContent());
    }

    /**
     * {@code GET  /niveaux-etudes/:id} : get the "id" niveauxEtudes.
     *
     * @param id the id of the niveauxEtudes to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the niveauxEtudes, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/niveaux-etudes/{id}")
    public ResponseEntity<NiveauxEtudes> getNiveauxEtudes(@PathVariable Long id) {
        log.debug("REST request to get NiveauxEtudes : {}", id);
        Optional<NiveauxEtudes> niveauxEtudes = niveauxEtudesService.findOne(id);
        return ResponseUtil.wrapOrNotFound(niveauxEtudes);
    }

    /**
     * {@code DELETE  /niveaux-etudes/:id} : delete the "id" niveauxEtudes.
     *
     * @param id the id of the niveauxEtudes to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/niveaux-etudes/{id}")
    public ResponseEntity<Void> deleteNiveauxEtudes(@PathVariable Long id) {
        log.debug("REST request to delete NiveauxEtudes : {}", id);
        niveauxEtudesService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
